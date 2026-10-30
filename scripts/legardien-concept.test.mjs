import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";
import nextConfig from "../next.config.ts";

const root = new URL("../public/legardien-concept/", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const script = await readFile(new URL("app.js", root), "utf8");

test("concept has one exact internal rewrite and scoped noindex header", async () => {
  assert.deepEqual(await nextConfig.rewrites(), [{
    source: "/legardien-concept",
    destination: "/legardien-concept/index.html",
  }]);
  assert.deepEqual(await nextConfig.headers(), [{
    source: "/legardien-concept/:path*",
    headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
  }]);
});

test("concept is standalone, clearly unofficial and excluded from indexing", () => {
  assert.match(html, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(html, /Unofficial website concept/);
  assert.match(html, /Website concept by Swift Sense Digital/);
  assert.doesNotMatch(html + script, /unofficial, private|googletagmanager|clarity\.ms|_vercel|LeadResponseAssistant|chatgpt\.site/i);
});

test("demo form cannot transmit, track or persist entered details", () => {
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /form-action 'none'/);
  assert.match(html, /script-src 'self'/);
  assert.match(html, /Demo only — no enquiry is sent or saved/);
  assert.match(script, /event\.preventDefault\(\)/);
  assert.match(script, /addEventListener\('close',resetEnquiry\)/);
  assert.match(script, /dd\.textContent=f\.elements\[name\]\.value\.trim\(\)/);
  assert.doesNotMatch(script, /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|localStorage|sessionStorage|indexedDB|document\.cookie/);
  assert.doesNotMatch(html, /<form[^>]+(?:action|method)=/);
});

test("all asset references resolve beneath the isolated route", async () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  const assets = refs.filter(ref => !ref.startsWith("#") && !ref.startsWith("https://"));
  assets.push(...[...script.matchAll(/image:'([^']+)'/g)].map(m => m[1]));
  assert.ok(assets.length >= 10);
  for (const path of assets) {
    assert.ok(path.startsWith("/legardien-concept/"), path);
    await access(new URL(path.replace("/legardien-concept/", ""), root));
  }
});

test("internal anchors resolve and IDs are unique", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(anchor), anchor);
  }
  for (const [, tag] of html.matchAll(/(<img\b[^>]*>)/g)) {
    assert.match(tag, /\balt="[^"]+"/);
  }
});
