const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { test } = require("node:test");
const ts = require("typescript");

function renderModal(fetchResponse, user = "test-user") {
  let state = [], hook = 0, closed = [], updates = [];
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync("components/modal/postQmodal.tsx", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(code, {
    exports, console: { log() {} },
    document: {
      location: { pathname: "/cs/CS111", origin: "http://local.invalid" },
      getElementById: id => ({ value: id === "title" ? "My draft title" : "My draft question" }),
    },
    localStorage: { getItem: () => user },
    fetch: fetchResponse,
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx, Fragment: "fragment" };
      if (name === "react") return { useState: initial => {
        const i = hook++;
        if (!(i in state)) state[i] = initial;
        return [state[i], value => state[i] = value];
      }};
      return { default: {} };
    },
  });
  function render() {
    hook = 0;
    return exports.default({ closeModal: value => closed.push(value), setData: data => updates.push(data) });
  }
  function all(node, predicate) {
    if (!node || typeof node !== "object") return [];
    return [...(predicate(node) ? [node] : []), ...[node.props?.children].flat(Infinity).flatMap(n => all(n, predicate))];
  }
  const tree = render();
  const post = all(tree, n => n.type === "button" && n.props.onClick?.name === "postFunction")[0];
  return { submit: post.props.onClick, render, all, closed, updates };
}

for (const [label, fetchResponse] of [
  ["HTTP failure", async () => ({ ok: false, json: async () => ({ error: "provider detail" }) })],
  ["network rejection", async () => { throw Error("offline"); }],
  ["unreadable JSON", async () => ({ ok: true, json: async () => { throw Error("bad json"); } })],
  ["malformed success", async () => ({ ok: true, json: async () => ({}) })],
]) {
  test(`${label} keeps the draft modal open and shows a retry error`, async () => {
    const modal = renderModal(fetchResponse);
    await assert.doesNotReject(modal.submit());
    assert.equal(modal.closed.length, 0);
    assert.equal(modal.updates.length, 0);
    assert.equal(modal.all(modal.render(), n => n.props?.role === "alert").length, 1);
  });
}

test("successful posting updates the parent before closing and removes null holes", async () => {
  const modal = renderModal(async () => ({
    ok: true,
    json: async () => ({ posts: { 0: { title: "old" }, 1: null, 2: { title: "new" } } }),
  }));
  await modal.submit();
  assert.equal(modal.closed.length, 1);
  assert.equal(modal.updates[0][0].value.title, "new");
  assert.equal(modal.updates[0].length, 2);
});

test("an anonymous post stays open without making a request", async () => {
  const modal = renderModal(() => { throw Error("must not fetch"); }, null);
  await modal.submit();
  assert.equal(modal.closed.length, 0);
  assert.match(modal.all(modal.render(), n => n.props?.role === "alert")[0].props.children, /sign in/i);
});

test("pending submission disables Post and a failed request can be retried", async () => {
  let resolve;
  const modal = renderModal(() => new Promise(done => { resolve = done; }));
  const first = modal.submit();
  let button = modal.all(modal.render(), n => n.type === "button" && n.props.onClick?.name === "postFunction")[0];
  assert.equal(button.props.disabled, true);
  resolve({ ok: false });
  await first;
  button = modal.all(modal.render(), n => n.type === "button" && n.props.onClick?.name === "postFunction")[0];
  assert.equal(button.props.disabled, false);
  const retry = button.props.onClick();
  resolve({ ok: true, json: async () => ({ posts: { 0: { title: "retry succeeded" } } }) });
  await retry;
  assert.equal(modal.closed.length, 1);
});
