/** Global search dialog (/ or Ctrl+K) over chapters, parts, steps, FAQ, rules, stores and glossary. */

import { BUILD_PHASES_DATA } from '../data/build-phases.js';
import { FAQ_DATA } from '../data/faq.js';
import { GLOSSARY_DATA } from '../data/glossary.js';
import { PARTS_DATA } from '../data/parts.js';
import { PREFLIGHT_CARDS_DATA } from '../data/preflight.js';
import { REGULATIONS_DATA } from '../data/regulations.js';
import { STORES_DATA } from '../data/stores.js';
import { renderGlossary } from './glossary.js';
import { setExplorerFilter } from './parts-explorer.js';
import { revealTarget } from '../utils/collapse.js';
import { escapeHtml } from '../utils/dom.js';

export let SEARCH_INDEX = [];

export function stripTags(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  return d.textContent || '';
}

export function buildSearchIndex() {
  const idx = [];
  document.querySelectorAll('section.chapter-section').forEach((sec) => {
    const h = sec.querySelector('h1, h2');
    const desc = sec.querySelector('.section-desc, .hero-lead');
    if (h) idx.push({ kind: 'Chapter', title: h.textContent.trim(), text: desc ? desc.textContent : '', target: `#${sec.id}` });
  });
  document.querySelectorAll('.bf-step-card').forEach((card, i) => {
    const h = card.querySelector('h3');
    if (!h) return;
    if (!card.id) card.id = `sw-step-${i + 1}`;
    idx.push({ kind: 'Software step', title: h.textContent.trim(), text: card.textContent, target: `#${card.id}` });
  });
  PARTS_DATA.forEach((p) => idx.push({ kind: 'Part', title: p.name, text: [p.subtitle, p.whyChosen, p.alternatives, p.gotchas].join(' '), target: `#part-${p.id}`, action: 'part' }));
  BUILD_PHASES_DATA.forEach((ph) => ph.tasks.forEach((t) => idx.push({ kind: `Build · ${ph.number}`, title: t.title, text: t.detail, target: '#build' })));
  PREFLIGHT_CARDS_DATA.forEach((c) => c.tasks.forEach((t) => idx.push({ kind: 'Pre-flight', title: t.title, text: t.detail, target: '#preflight' })));
  FAQ_DATA.forEach((f) => idx.push({ kind: 'FAQ', title: f.question.replace(/^\d+\.\s*/, ''), text: stripTags(f.answer), target: `#${f.id}`, action: 'faq' }));
  REGULATIONS_DATA.forEach((r) => idx.push({ kind: 'Israel rule', title: r.title, text: stripTags(r.body), target: `#${r.id}` }));
  STORES_DATA.forEach((st) => idx.push({ kind: 'Store', title: st.name, text: [st.bestFor, st.pros, st.cons, st.shipping].join(' '), target: '#where-to-buy' }));
  GLOSSARY_DATA.forEach((g) => idx.push({ kind: 'Glossary', title: g.term, text: g.def, target: '#glossary', action: 'glossary' }));
  SEARCH_INDEX = idx.map((e) => Object.assign(e, { hay: `${e.title} ${e.text}`.toLowerCase() }));
}

export function searchGuide(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return SEARCH_INDEX
    .filter((e) => terms.every((t) => e.hay.includes(t)))
    .map((e) => {
      const titleHits = terms.filter((t) => e.title.toLowerCase().includes(t)).length;
      return { e, score: titleHits * 10 + (e.kind === 'Chapter' ? 3 : 0) + (e.kind === 'Part' ? 2 : 0) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((r) => r.e);
}

export function snippetFor(entry, query) {
  const text = entry.text.replace(/\s+/g, ' ').trim();
  const first = query.toLowerCase().split(/\s+/).filter(Boolean)[0] || '';
  const pos = first ? text.toLowerCase().indexOf(first) : -1;
  const start = Math.max(0, pos - 40);
  return (start > 0 ? '…' : '') + text.slice(start, start + 140);
}

export function goToSearchResult(entry) {
  if (entry.action === 'part') {
    setExplorerFilter('drone', 'all');
    setExplorerFilter('category', 'all');
  } else if (entry.action === 'faq') {
    const item = document.querySelector(entry.target);
    if (item && !item.classList.contains('open')) item.querySelector('.faq-trigger').click();
  } else if (entry.action === 'glossary') {
    const input = document.getElementById('glossaryFilterInput');
    if (input) { input.value = entry.title; renderGlossary(entry.title); }
  }
  const el = document.querySelector(entry.target);
  if (!el) return;
  revealTarget(el);
  el.querySelectorAll('.reveal').forEach((r) => r.classList.add('visible'));
  const sec = el.closest('.reveal');
  if (sec) sec.classList.add('visible');
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  el.classList.remove('flash-target');
  void el.offsetWidth;
  el.classList.add('flash-target');
  if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  history.replaceState(null, '', entry.target);
}

export function initGlobalSearch() {
  const dialog = document.getElementById('searchDialog');
  const openBtn = document.getElementById('searchOpenBtn');
  const closeBtn = document.getElementById('searchCloseBtn');
  const input = document.getElementById('globalSearchInput');
  const results = document.getElementById('globalSearchResults');
  if (!dialog || !input || !results) return;
  let current = [];

  const render = () => {
    const q = input.value.trim();
    current = searchGuide(q);
    if (!q) {
      results.innerHTML = '<li class="search-hint search-empty">Try: "SBUS", "GPS lock", "LiHV", "VAT", "spotter", "Pinecil"</li>';
      return;
    }
    results.innerHTML = current.length
      ? current.map((e, i) => `<li><a href="${e.target}" data-result-idx="${i}"><span class="search-result-kind">${escapeHtml(e.kind)}</span><br /><strong>${escapeHtml(e.title)}</strong><span class="search-result-snippet">${escapeHtml(snippetFor(e, q))}</span></a></li>`).join('')
      : `<li class="search-hint search-empty">No results for "${escapeHtml(q)}".</li>`;
  };

  const open = () => {
    if (!SEARCH_INDEX.length) buildSearchIndex();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    input.select();
    render();
  };
  const close = () => {
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  };

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      const first = results.querySelector('a');
      if (first) { first.focus(); e.preventDefault(); }
    } else if (e.key === 'Enter') {
      const first = results.querySelector('a');
      if (first) { first.click(); e.preventDefault(); }
    }
  });
  results.addEventListener('keydown', (e) => {
    const links = Array.from(results.querySelectorAll('a'));
    const i = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown' && i < links.length - 1) { links[i + 1].focus(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { (i > 0 ? links[i - 1] : input).focus(); e.preventDefault(); }
  });
  results.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-result-idx]');
    if (!a) return;
    e.preventDefault();
    const entry = current[Number(a.getAttribute('data-result-idx'))];
    close();
    if (entry) goToSearchResult(entry);
  });
  document.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      open();
    }
  });
}
