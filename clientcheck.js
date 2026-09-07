/*
 * clientcheck.js — the client's 6 September message, turned into assertions.
 *
 * One check per sentence the client wrote, run against the live preview. It
 * reads the rendered page (positions, counts, the served logo bytes), not the
 * source, so it answers "is this actually true on screen" rather than "is the
 * code there".
 *
 *   node clientcheck.js                     # the live preview
 *   node clientcheck.js http://127.0.0.1:8899   # a local server
 *
 * Exit code 0 = every check passed.
 */
const { chromium } = require('playwright');
const crypto = require('crypto');

const BASE = (process.argv[2] || 'https://jaweria007.github.io/banyan-property/preview').replace(/\/$/, '');
const LOGO_SOURCE = 'https://banyanproperties.co/logo.png?v=2';

// The eight metrics, in the client's words and the client's order.
const METRICS = [
  'Opportunities Pending Requirements',
  'Opportunities Pending Shortlists',
  'Opportunities Needing Action',
  'Listings Requiring Action',
  'Scouts Requiring Attention',
  'Properties Under-Published',
  'Channel Capacity Used',
  'Supply Needing Attention',
];

const results = [];
const check = (item, quote, pass, detail) => results.push({ item, quote, pass, detail });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('banyan_signed_in', '1'); } catch (e) {} });
  const page = await ctx.newPage();

  // ---------------------------------------------------------------- item 1
  await page.goto(BASE + '/my-work.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const mw = await page.evaluate(() => {
    const box = (el) => (el ? el.getBoundingClientRect() : null);
    const head = document.querySelector('.page-head__actions');
    const toggle = document.querySelector('.view-toggle');
    const newTask = document.querySelector('#newTaskBtn');
    const filters = Array.from(document.querySelectorAll('.work-filters > *'));
    const tops = filters.map((f) => Math.round(f.getBoundingClientRect().top));
    return {
      toggleInHead: !!(head && toggle && head.contains(toggle)),
      newTaskInHead: !!(head && newTask && head.contains(newTask)),
      toggleTop: Math.round(box(toggle)?.top ?? -1),
      newTaskTop: Math.round(box(newTask)?.top ?? -1),
      filterCount: filters.length,
      distinctFilterRows: new Set(tops).size,
      filterTops: tops,
    };
  });

  check(1, 'move Board/List view to the righthand top next to "New Task"',
    mw.toggleInHead && mw.newTaskInHead && Math.abs(mw.toggleTop - mw.newTaskTop) <= 12,
    `toggle and New Task both in the page head, tops ${mw.toggleTop} vs ${mw.newTaskTop}`);

  check(1, 'Then you have more space to have the Search and Filters on one line',
    mw.distinctFilterRows === 1,
    `${mw.filterCount} filter controls on ${mw.distinctFilterRows} row(s) — tops ${mw.filterTops.join(', ')}`);

  check(1, 'It now shows on 2 separate lines',
    mw.distinctFilterRows === 1,
    mw.distinctFilterRows === 1 ? 'no longer two lines' : 'STILL two lines');

  // ---------------------------------------------------------------- item 2
  await page.goto(BASE + '/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const ov = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const main = document.querySelector('main.content');
    const attention = document.querySelector('.attention');
    const grid = document.querySelector('.attention-grid');
    const cards = Array.from(document.querySelectorAll('.attention-card'));
    const duo = document.querySelector('.duo-grid');
    const duoKids = duo ? Array.from(duo.children) : [];

    const tops = cards.map((c) => Math.round(r(c).top));
    const rows = [...new Set(tops)].sort((a, b) => a - b);
    const perRow = rows.map((t) => tops.filter((x) => x === t).length);

    // a label that has been squeezed narrower than its own text
    const clipped = cards
      .map((c) => c.querySelector('.attention-card__label'))
      .filter((l) => l && l.scrollWidth > l.clientWidth + 1)
      .map((l) => l.textContent.trim());

    return {
      attentionWidth: attention ? Math.round(r(attention).width) : 0,
      // the CONTENT box: the section fills the main minus its own padding, so
      // comparing against the padding box would fail a correct layout
      mainWidth: main
        ? Math.round(r(main).width
            - parseFloat(getComputedStyle(main).paddingLeft)
            - parseFloat(getComputedStyle(main).paddingRight))
        : 0,
      gridCols: grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0,
      cardCount: cards.length,
      rowCount: rows.length,
      perRow,
      labels: cards.map((c) => (c.querySelector('.attention-card__label')?.textContent || '').trim()),
      pendingCount: document.querySelectorAll('.attention-card--pending').length,
      pendingValues: Array.from(document.querySelectorAll('.attention-card--pending .attention-card__value'))
        .map((v) => v.textContent.trim()),
      rules: Array.from(document.querySelectorAll('.attention-card__rule')).length,
      duoCols: duoKids.length,
      duoSideBySide: duoKids.length === 2 &&
        Math.abs(Math.round(r(duoKids[0]).top) - Math.round(r(duoKids[1]).top)) <= 12,
      duoBelowAttention: !!(attention && duo && r(duo).top > r(attention).bottom - 1),
      duoTitles: duoKids.map((k) => (k.querySelector('.panel-title')?.textContent || '').trim()),
      clipped,
    };
  });

  check(2, 'can we align the UI boxes more cleanly … 3 columns in the body is a lot',
    ov.attentionWidth >= ov.mainWidth - 4,
    `Needs attention spans ${ov.attentionWidth}px of the ${ov.mainWidth}px body (full width = no third column)`);

  check(2, '"Needs Attention" as the top row with the 4 metrics column in one line',
    ov.gridCols === 4 && ov.perRow[0] === 4,
    `grid is ${ov.gridCols} columns, ${ov.perRow[0]} cards on the first row`);

  check(2, 'I would prefer that the Needs Attention section accommodates for 2 rows',
    ov.rowCount === 2 && ov.perRow.every((n) => n === 4),
    `${ov.cardCount} cards over ${ov.rowCount} rows of ${ov.perRow.join(' + ')}`);

  check(2, 'as I will add 8 metrics in total',
    ov.cardCount === 8, `${ov.cardCount} metric cards present`);

  const missing = METRICS.filter((m) => !ov.labels.some((l) => l.toLowerCase() === m.toLowerCase()));
  check(2, 'can we display other metrics here (the eight named)',
    missing.length === 0,
    missing.length ? 'MISSING: ' + missing.join(', ') : 'all eight named metrics present, in order');

  check(2, 'Add already 4 placeholder metrics in Row 2',
    ov.pendingCount === 4 && ov.pendingValues.every((v) => !/\d/.test(v)),
    `${ov.pendingCount} placeholders, values ${JSON.stringify(ov.pendingValues)} (no invented figures)`);

  check(2, 'and then have underneath it 2 columns for Recent Activity and Upcoming',
    ov.duoCols === 2 && ov.duoSideBySide && ov.duoBelowAttention,
    `${ov.duoCols} panels side by side below Needs attention: ${ov.duoTitles.join(' | ')}`);

  check(2, 'Now text gets wrapped',
    ov.clipped.length === 0,
    ov.clipped.length ? 'CLIPPED: ' + ov.clipped.join(' / ') : 'no metric label is clipped by its box');

  // ---------------------------------------------------------------- item 3
  const logo = await page.evaluate(() => {
    const img = document.querySelector('.brand__logo');
    return img ? { src: img.currentSrc || img.src, w: img.naturalWidth, h: img.naturalHeight } : null;
  });

  check(3, 'change the logo to our actual Banyan Logo',
    !!logo && logo.w > 0,
    logo ? `sidebar logo loads, ${logo.w}x${logo.h}` : 'no .brand__logo found');

  // The strongest available check on "the correct tagline": the served file is
  // byte-for-byte the artwork at the client's own URL.
  let served = null, source = null;
  try {
    served = await (await fetch(logo.src)).arrayBuffer();
    source = await (await fetch(LOGO_SOURCE)).arrayBuffer();
  } catch (e) { /* offline */ }
  const sha = (b) => (b ? crypto.createHash('sha256').update(Buffer.from(b)).digest('hex').slice(0, 12) : 'n/a');

  check(3, 'with the correct tagline as per banyanproperties.co/logo.png?v=2',
    !!served && !!source && sha(served) === sha(source),
    served && source
      ? `served ${sha(served)} vs client's file ${sha(source)} — ${sha(served) === sha(source) ? 'identical' : 'DIFFERENT'}`
      : 'could not fetch one of the two files (offline?)');

  await browser.close();

  // ---------------------------------------------------------------- report
  const pad = (s, n) => String(s).padEnd(n);
  let lastItem = null;
  console.log(`\nClient message, 6 September — checked against ${BASE}\n`);
  for (const r of results) {
    if (r.item !== lastItem) {
      console.log(`\n  ── Item ${r.item} ${'─'.repeat(58)}`);
      lastItem = r.item;
    }
    console.log(`  ${r.pass ? 'PASS' : 'FAIL'}  ${r.quote}`);
    console.log(`        ${pad('', 0)}${r.detail}`);
  }
  const failed = results.filter((r) => !r.pass);
  console.log(`\n  ${results.length - failed.length}/${results.length} checks passed\n`);
  process.exit(failed.length ? 1 : 0);
})();
