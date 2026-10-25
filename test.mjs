import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { calculateSavings, priceFor } from "./public/calculations.mjs";
import { createApp } from "./server.mjs";

test("ROI formula matches the bounty specification", () => {
  const result = calculateSavings({ tickets:2400, minutes:8, hourlyCost:28, automation:55 });
  assert.equal(result.hoursSaved, 176);
  assert.equal(result.laborSavings, 4928);
});
test("calculator validates input bounds", () => {
  assert.throws(() => calculateSavings({ tickets:1, minutes:1, hourlyCost:1, automation:101 }), /between/);
  assert.throws(() => calculateSavings({ tickets:-1, minutes:1, hourlyCost:1, automation:10 }), /positive/);
});
test("annual pricing applies exactly 20 percent discount", () => {
  assert.deepEqual(priceFor("yearly", 149), { displayed:119.2, billed:1430.4, label:"per month, billed annually" });
  assert.equal(priceFor("monthly", 149).displayed, 149);
});
test("landing page serves every required section", async t => {
  const app = createApp().listen(0, "127.0.0.1"); t.after(() => app.close());
  await new Promise(resolve => app.once("listening", resolve));
  const response = await fetch(`http://127.0.0.1:${app.address().port}`);
  const html = await response.text();
  assert.equal(response.status, 200);
  for (const id of ["features", "how", "calculator", "pricing", "cta"]) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(html, /class="section faq"/);
});
test("source contains no remote runtime dependency", async () => {
  const html = await readFile(new URL("./public/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /https?:\/\//);
});
