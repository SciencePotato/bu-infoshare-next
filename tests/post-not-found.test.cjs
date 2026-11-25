const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

function loadPostPage(value) {
  let requestedPath;
  const source = fs.readFileSync(path.join(__dirname, "../pages/[Major]/[Course]/[PostID]/index.tsx"), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  const database = {
    getDatabase: () => ({}),
    ref: () => ({}),
    child: (_, key) => { requestedPath = key; return key; },
    get: async () => {
      if (value instanceof Error) throw value;
      return { val: () => value };
    },
  };
  vm.runInNewContext(code, {
    exports,
    console,
    require: (id) => {
      if (id === "firebase/database") return database;
      if (id === "firebase/app") return { initializeApp: () => ({}) };
      return {};
    },
  });
  return { getServerSideProps: exports.getServerSideProps, requestedPath: () => requestedPath };
}

const context = { params: { Major: "cs", Course: "cs111", PostID: "post-a" } };

test("a missing post returns Next's notFound result instead of null render props", async () => {
  const page = loadPostPage(null);
  const result = await page.getServerSideProps(context);
  assert.equal(result.notFound, true);
  assert.equal(result.props, undefined);
  assert.equal(page.requestedPath(), "/major/cs/courses/CS111/posts/post-a");
});

test("a populated post preserves its data and existing comment handoff", async () => {
  const data = { title: "Test post", votes: 1, upvoters: {}, downvoters: {}, comment: { 1: { content: "Reply" } } };
  const page = loadPostPage(data);
  const result = await page.getServerSideProps(context);
  assert.equal(result.props.dataDict, data);
  assert.equal(result.props.dataArray[0], data.comment[1]);
  assert.equal(result.props.dataKeyPath, "post-a");
});

test("a failed database read remains an error rather than becoming a false 404", async () => {
  const page = loadPostPage(new Error("Database unavailable"));
  await assert.rejects(() => page.getServerSideProps(context), /Database unavailable/);
});
