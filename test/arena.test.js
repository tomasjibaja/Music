// Humo de la Arena: arranca en modo prueba y dentro de la plataforma (con y sin temas)
const fs = require('fs'), path = require('path'), assert = require('node:assert/strict');
const html = fs.readFileSync(path.join(__dirname, '../games-src/arena/index.html'), 'utf8');
const code = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
function run(S) {
  const els = {};
  const mk = () => ({ _h: '', set innerHTML(v) { this._h = v; }, get innerHTML() { return this._h; }, style: { setProperty() {}, removeProperty() {} }, className: '', textContent: '', value: '1', dataset: {}, classList: { toggle() {} }, querySelectorAll: () => [], querySelector: () => mk(), appendChild() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 10, height: 10 }), animate: () => ({ finished: Promise.resolve(), cancel() {} }) });
  const $ = (s) => els[s] || (els[s] = mk());
  const posted = [];
  const g = { document: { querySelector: $, createElement: mk }, window: { SONORO: S }, parent: { postMessage: (o) => posted.push(o) }, setTimeout, setInterval, clearInterval };
  new Function('document', 'window', 'parent', 'setInterval', 'clearInterval', code)(g.document, g.window, g.parent, () => 0, () => {});
  return { els, posted };
}
(async () => {
  let r = run(undefined); assert.equal(r.els['#tb'].style.display, 'block'); assert.ok(r.els['#ov'].innerHTML.includes('Empezar batalla'));
  r = run({ charLevel: 4, topics: [], figs: [], meFig: '<svg/>' }); assert.ok(r.els['#ov'].innerHTML.includes('Todavía no hay temas habilitados'));
  r = run({ charLevel: 4, topics: ['t1', 't3', 'zz'], figs: [], meFig: '<svg/>' }); assert.ok(r.els['#ov'].innerHTML.includes('Empezar batalla'));
  assert.ok(!/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u.test(html), 'sin emojis');
  const bank = [...code.matchAll(/^\['(t\d)',/gm)].map((m) => m[1]); for (const t of ['t1', 't2', 't3', 't4', 't5', 't6']) assert.equal(bank.filter((x) => x === t).length, 25, t);
  console.log('Arena OK (arranque en prueba y en plataforma, sin emojis, 25 preguntas por tema)');
})().catch((e) => { console.error('FALLÓ:', e); process.exit(1); });
