import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { test } from "node:test";
import ts from "typescript";

const jsx = (type, props) => ({ type, props });
const react = { useState: value => [value, () => {}], useEffect: () => {} };
function load(file, imports) {
  const { outputText } = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    require: name => {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "react") return react;
      if (Object.hasOwn(imports, name)) return imports[name];
      return { default: "inert-child" };
    },
  });
  return exports;
}
function nodes(node) {
  if (Array.isArray(node)) return node.flatMap(nodes);
  if (!node || typeof node !== "object") return [];
  return [node, ...nodes(node.props?.children)];
}

test("the major page selects key filtering for its course-shaped data", () => {
  const Navbar = load("../components/navbar/navbar.tsx", {}).default;
  const Major = load("../pages/[Major]/index.tsx", {
    "../../components/navbar/navbar": { default: Navbar },
    "next/router": { useRouter: () => ({ push: () => {} }) },
  }).default;
  const data = [
    { key: "CS101", value: { courseName: "Introduction" } },
    { key: "CS202", value: { courseName: "Algorithms" } },
  ];
  const nav = nodes(Major({ dataDict: {}, dataArray: data, dataKey: "cs" }))
    .find(node => node.type === Navbar);
  let filtered;
  const input = nodes(Navbar({ ...nav.props, setData: next => { filtered = next; } }))
    .find(node => node.type === "input");
  input.props.onChange({ target: { value: "cs101" } });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].key, "CS101");
  input.props.onChange({ target: { value: "" } });
  assert.equal(filtered.length, 2);
});
