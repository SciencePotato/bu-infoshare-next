const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const postFile = "pages/[Major]/[Course]/[PostID]/index.tsx";
const comment = content => ({ content, user: "author", votes: 1, upvoters: { rand: false }, downvoters: { rand: false } });
const allNodes = tree => !tree || typeof tree !== "object" ? [] : Array.isArray(tree) ? tree.flatMap(allNodes) : [tree, ...allNodes(tree.props?.children)];
function hooks() {
  const states = [];
  let cursor = 0;
  return {
    react: {
      useState(initial) {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], value => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
      },
      useEffect() {},
    },
    render(component, props) { cursor = 0; return component(props); },
  };
}
function load(file, react, snapshot, fetch) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(code, {
    module, exports: module.exports, console: { log() {} }, fetch,
    localStorage: { getItem: () => "reader" },
    document: { location: { pathname: "/cs/cs101/7", origin: "http://localhost" }, getElementById: () => ({ value: "New reply" }) },
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return { jsx: (type, props, key) => ({ type, props, key }), jsxs: (type, props, key) => ({ type, props, key }) };
      if (name === "next/router") return { useRouter: () => ({ push() {} }) };
      if (name === "firebase/app") return { initializeApp: () => ({}) };
      if (name === "firebase/database") return { getDatabase: () => ({}), ref: () => ({}), child: () => ({}), get: async () => ({ val: () => snapshot }) };
      if (name.endsWith("/utils")) return { firebaseConfig: {} };
      if (name.endsWith("/navbar/navbar")) return { __esModule: true, default: "navbar" };
      if (name.endsWith("/comment/Comment")) return { __esModule: true, default: "comment" };
      if (name.endsWith(".scss")) return { __esModule: true, default: {} };
      if (name.endsWith(".png")) return name;
      if (name === "next/image") return { __esModule: true, default: "image" };
      if (name === "next/head") return { __esModule: true, default: "head" };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return module.exports;
}
const context = { params: { Major: "cs", Course: "cs101", PostID: "7" } };
test("sparse SSR comments retain their database keys and omit null array holes", async () => {
  const data = { ...comment("Post"), comment: [null, comment("First"), null, comment("Third")] };
  const page = load(postFile, hooks().react, data, async () => {});
  const { props } = await page.getServerSideProps(context);
  assert.equal(props.dataArray.length, 2);
  assert.deepEqual(Array.from(props.dataArray, c => c.commentKey), ["1", "3"]);
});

test("filtering to a later reply sends votes to that reply's original database key", async () => {
  const data = { ...comment("Post"), comment: { 1: comment("First"), 3: comment("Third") } };
  const h = hooks(), page = load(postFile, h.react, data, async () => {});
  const { props } = await page.getServerSideProps(context);
  const tree = h.render(page.default, props);
  allNodes(tree).find(n => n.type === "navbar").props.setData([props.dataArray[1]]);
  const reply = allNodes(h.render(page.default, props)).find(n => n.type === "comment");
  for (const direction of [0, 1]) {
    const childHooks = hooks();
    let payload;
    const child = load("components/comment/Comment.tsx", childHooks.react, null, async (_url, options) => {
      payload = JSON.parse(options.body);
      return Response.json({ votes: payload.votes });
    });
    const rendered = childHooks.render(child.default, JSON.parse(JSON.stringify(reply.props)));
    await allNodes(rendered).filter(n => n.type === "image" && n.props.onClick)[direction].props.onClick();
    assert.equal(payload.path, "/major/cs/courses/CS101/posts/7/comment/3");
    assert.equal(payload.votes, direction === 0 ? 2 : 0);
  }
});

test("reordering displayed replies does not change the supplied vote identities", async () => {
  const data = { ...comment("Post"), comment: { 1: comment("First"), 3: comment("Third") } };
  const h = hooks(), page = load(postFile, h.react, data, async () => {});
  const { props } = await page.getServerSideProps(context);
  const tree = h.render(page.default, props);
  allNodes(tree).find(n => n.type === "navbar").props.setData([...props.dataArray].reverse());
  const replies = allNodes(h.render(page.default, props)).filter(n => n.type === "comment");
  assert.deepEqual(replies.map(n => n.props.commentID), ["3", "1"]);
});

test("new reply responses retain keys when the displayed list is replaced", async () => {
  const data = { ...comment("Post"), comment: { 1: comment("First") } };
  const h = hooks(), page = load(postFile, h.react, data, async () => Response.json([null, comment("First"), comment("Second")]));
  const { props } = await page.getServerSideProps(context);
  const tree = h.render(page.default, props);
  await allNodes(tree).find(n => n.type === "button" && n.props.onClick).props.onClick();
  await Promise.resolve();
  const replies = allNodes(h.render(page.default, props)).filter(n => n.type === "comment");
  assert.deepEqual(replies.map(n => n.props.commentID), ["1", "2"]);
});
