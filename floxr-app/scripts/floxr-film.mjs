/**
 * Floxr brand film — deterministic frame renderer.
 *
 * Not an ad. A storyline: a business already produces everything it needs to
 * grow, the signal just lands in six disconnected places. We put it in one
 * place, and it starts answering questions.
 *
 * Every frame is a pure function of time, so the whole film renders offline
 * (sharp → PNG) and is stitched by ffmpeg. No browser, no screen recording.
 *
 *   node scripts/floxr-film.mjs                     # full render, both formats
 *   FILM_ONLY=vertical node scripts/floxr-film.mjs  # one format
 *   FILM_PREVIEW=7,15,21 node scripts/floxr-film.mjs
 */
import sharp from 'sharp';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const FPS = 30;
const DURATION = 52;
const OUT_DIR = process.env.FILM_OUT || path.resolve('film');
const ALL_FORMATS = [
  { id: 'vertical',  W: 1080, H: 1920 },   // Reels / Stories / TikTok
  { id: 'landscape', W: 1920, H: 1080 },   // site, LinkedIn, YouTube
];
const FORMATS = process.env.FILM_ONLY
  ? ALL_FORMATS.filter((f) => f.id === process.env.FILM_ONLY)
  : ALL_FORMATS;

/* ── palette (matches the site) ───────────────────────────── */
const PAPER = '#FFFFFF';
const INK   = '#101112';
const MIST  = '#63676E';
const DIM   = '#8C9096';

const SANS  = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const SERIF = 'Didot, Times New Roman, Georgia, serif';

/* ── the acts, as a table so timing stays editable ─────────── */
const ACTS = {
  mark:     [0.0,  4.8],
  signals:  [4.8,  11.6],
  scatter:  [11.6, 18.6],
  converge: [18.6, 24.6],
  insight:  [24.6, 34.6],
  climb:    [34.6, 39.6],
  system:   [39.6, 46.6],
  close:    [46.6, 52.0],
};

/* ── easing + timing helpers ──────────────────────────────── */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const outExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const outCubic = (t) => 1 - Math.pow(1 - t, 3);
const inOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** progress of a cue starting at `start`, lasting `dur` */
const cue = (t, start, dur) => clamp((t - start) / dur);
/** 0→1→0 window, for type that arrives then leaves */
const hold = (t, start, dur, fade = 0.5) =>
  Math.min(outExpo(clamp((t - start) / fade)), outCubic(clamp((start + dur - t) / fade)));
/** deterministic hash noise — keeps every render identical */
const rnd = (i, salt = 0) => {
  const x = Math.sin((i + 1) * 127.1 + (salt + 1) * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const op = (v) => clamp(v).toFixed(3);

/* ── type primitives ──────────────────────────────────────── */

/** A line of type that lifts up from behind a clip. */
function reveal(text, { x, y, size, weight = 400, fill = INK, family = SANS, anchor = 'middle', track = -0.022, p = 1, id }) {
  return revealRich(esc(text), { x, y, size, weight, fill, family, anchor, track, p, id });
}

/** As `reveal`, but the caller supplies inner markup (e.g. a tspan in another face). */
function revealRich(inner, { x, y, size, weight = 400, fill = INK, family = SANS, anchor = 'middle', track = -0.022, p = 1, id }) {
  if (p <= 0.001) return '';
  const dy = (1 - outExpo(p)) * size * 1.2;
  return `
  <defs><clipPath id="c${id}"><rect x="${x - 2400}" y="${y - size * 1.04}" width="4800" height="${size * 1.44}"/></clipPath></defs>
  <g clip-path="url(#c${id})">
    <text x="${x}" y="${y}" transform="translate(0 ${dy.toFixed(2)})"
      font-family="${family}" font-size="${size.toFixed(2)}" font-weight="${weight}" fill="${fill}"
      text-anchor="${anchor}" letter-spacing="${(track * size).toFixed(2)}">${inner}</text>
  </g>`;
}

/** Small, wide-tracked uppercase label. */
function eyebrow(text, { x, y, size, fill = MIST, anchor = 'middle', opacity = 1, track = 0.24 }) {
  if (opacity <= 0.001) return '';
  return `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size.toFixed(2)}" font-weight="400"
    fill="${fill}" fill-opacity="${op(opacity)}" text-anchor="${anchor}"
    letter-spacing="${(size * track).toFixed(2)}">${esc(text.toUpperCase())}</text>`;
}

/** Plain body line, no clip lift. */
function line(text, { x, y, size, fill = MIST, weight = 400, anchor = 'middle', opacity = 1, track = -0.01 }) {
  if (opacity <= 0.001) return '';
  return `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size.toFixed(2)}" font-weight="${weight}"
    fill="${fill}" fill-opacity="${op(opacity)}" text-anchor="${anchor}"
    letter-spacing="${(size * track).toFixed(2)}">${esc(text)}</text>`;
}

/* ── the mark ─────────────────────────────────────────────── */

/** The Floxr gear, drawn with a progressive stroke. Lighter weight, to sit with light type. */
function gear(cx, cy, r, { p = 1, rot = 0, fill = INK }) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315]
    .filter((_, i) => i / 8 < p * 1.05)
    .map((deg) => {
      const s = r * 0.235;
      return `<rect transform="rotate(${deg})" x="${-s / 2}" y="${-r * 1.02}" width="${s}" height="${s * 1.05}" rx="${s * 0.1}" fill="${fill}"/>`;
    })
    .join('');
  const circ = 2 * Math.PI * (r * 0.74);
  return `
  <g transform="translate(${cx.toFixed(2)} ${cy.toFixed(2)}) rotate(${rot.toFixed(2)})">
    <circle cx="0" cy="0" r="${(r * 0.74).toFixed(2)}" fill="none" stroke="${fill}" stroke-width="${(r * 0.21).toFixed(2)}"
      stroke-dasharray="${circ.toFixed(2)}" stroke-dashoffset="${(circ * (1 - outCubic(p))).toFixed(2)}" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="${(r * 0.235).toFixed(2)}" fill="${fill}" fill-opacity="${op((p - 0.45) / 0.3)}"/>
    ${teeth}
  </g>`;
}

/**
 * Wordmark: fl [gear] xr — a minimal treatment of the lockup.
 * Light geometric weight, open tracking, lowercase. The gear keeps the brand
 * geometry; only its stroke is lightened to sit with the lighter type.
 */
function wordmark(cx, cy, size, { p = 1, fill = INK, rot = 0 }) {
  const track = size * 0.03;
  const gapR = size * 0.285;
  const half = size * 0.385;
  const base = `font-family="${SANS}" font-size="${size.toFixed(2)}" font-weight="300" fill="${fill}"
    letter-spacing="${track.toFixed(2)}"`;
  return `
  <g>
    <text x="${(cx - half + track).toFixed(2)}" y="${(cy + size * 0.355).toFixed(2)}" ${base}
      fill-opacity="${op(outExpo(cue(p, 0.1, 0.5)))}" text-anchor="end">fl</text>
    ${gear(cx, cy, gapR, { p, rot, fill })}
    <text x="${(cx + half).toFixed(2)}" y="${(cy + size * 0.355).toFixed(2)}" ${base}
      fill-opacity="${op(outExpo(cue(p, 0.2, 0.5)))}" text-anchor="start">xr</text>
  </g>`;
}

/* ── the data layer: one set of dots, three arrangements ────── */
const N = 132;

const ISLANDS = [
  { t: 'Till',            x: -0.34, y: -0.36 },
  { t: 'Spreadsheet',     x:  0.32, y: -0.34 },
  { t: 'WhatsApp orders', x: -0.37, y:  0.00 },
  { t: 'Stock book',      x:  0.35, y:  0.02 },
  { t: 'Instagram DMs',   x: -0.31, y:  0.35 },
  { t: 'Receipts',        x:  0.33, y:  0.34 },
];

/** The working area the dots live in. */
function field(W, H, vertical) {
  return vertical
    ? { cx: W / 2, cy: H * 0.52, w: W * 0.80, h: H * 0.46 }
    : { cx: W / 2, cy: H * 0.52, w: W * 0.74, h: H * 0.56 };
}

function scatterPos(i, f) {
  return {
    x: f.cx + (rnd(i, 1) - 0.5) * f.w,
    y: f.cy + (rnd(i, 2) - 0.5) * f.h,
  };
}

function islandPos(i, f, S) {
  const g = ISLANDS[i % ISLANDS.length];
  const a = rnd(i, 3) * Math.PI * 2;
  const rad = Math.sqrt(rnd(i, 4)) * S * 0.052;
  return { x: f.cx + g.x * f.w + Math.cos(a) * rad, y: f.cy + g.y * f.h + Math.sin(a) * rad * 0.8 };
}

function gridPos(i, f, S, vertical) {
  const cols = vertical ? 12 : 22;
  const rows = N / cols;
  const gap = vertical ? S * 0.058 : S * 0.042;
  const c = i % cols;
  const r = Math.floor(i / cols);
  return {
    x: f.cx + (c - (cols - 1) / 2) * gap,
    y: f.cy + (r - (rows - 1) / 2) * gap,
  };
}

function dot(x, y, r, o, filled = true) {
  return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" fill="${filled ? INK : 'none'}"
    stroke="${INK}" stroke-width="${(r * 0.5).toFixed(2)}" fill-opacity="${op(o)}" stroke-opacity="${op(o * 0.7)}"/>`;
}

/* ── insight scenes: small drawn diagrams, one idea each ───── */
function sceneBars(cx, cy, s, k) {
  const hs = [0.32, 0.5, 0.4, 0.88, 0.44, 0.6];
  const bw = s * 0.09;
  const gap = s * 0.062;
  const total = hs.length * bw + (hs.length - 1) * gap;
  const base = cy + s * 0.42;
  return `<g>
    <line x1="${cx - total / 2 - s * 0.05}" y1="${base}" x2="${cx + total / 2 + s * 0.05}" y2="${base}"
      stroke="${INK}" stroke-opacity="0.18" stroke-width="${s * 0.008}"/>
    ${hs.map((h, i) => {
      const o = clamp((k - i * 0.075) / 0.35);
      const bh = s * 0.78 * h * outCubic(o);
      const x = cx - total / 2 + i * (bw + gap);
      const star = i === 3;
      return `<rect x="${x.toFixed(2)}" y="${(base - bh).toFixed(2)}" width="${bw.toFixed(2)}" height="${bh.toFixed(2)}"
        fill="${INK}" fill-opacity="${op(star ? 1 : 0.22)}"/>
        ${star ? `<circle cx="${(x + bw / 2).toFixed(2)}" cy="${(base - bh - s * 0.075).toFixed(2)}" r="${(s * 0.022).toFixed(2)}"
          fill="${INK}" fill-opacity="${op((k - 0.7) / 0.25)}"/>` : ''}`;
    }).join('')}
  </g>`;
}

function sceneArc(cx, cy, s, k) {
  const r = s * 0.44;
  const cyy = cy + s * 0.24;
  const circ = Math.PI * r;
  const ticks = 13;
  return `<g>
    <path d="M ${cx - r} ${cyy} A ${r} ${r} 0 0 1 ${cx + r} ${cyy}" fill="none" stroke="${INK}"
      stroke-opacity="0.18" stroke-width="${s * 0.008}" stroke-dasharray="${circ.toFixed(2)}"
      stroke-dashoffset="${(circ * (1 - outCubic(clamp(k / 0.5)))).toFixed(2)}"/>
    ${Array.from({ length: ticks }, (_, i) => {
      const a = Math.PI - (i / (ticks - 1)) * Math.PI;
      const on = i >= 8 && i <= 10;
      const o = clamp((k - 0.3 - i * 0.03) / 0.3);
      const len = on ? s * 0.11 : s * 0.055;
      return `<line x1="${(cx + Math.cos(a) * (r - len)).toFixed(2)}" y1="${(cyy - Math.sin(a) * (r - len)).toFixed(2)}"
        x2="${(cx + Math.cos(a) * r).toFixed(2)}" y2="${(cyy - Math.sin(a) * r).toFixed(2)}"
        stroke="${INK}" stroke-width="${(s * (on ? 0.018 : 0.008)).toFixed(2)}" stroke-opacity="${op(o * (on ? 1 : 0.3))}"/>`;
    }).join('')}
    <circle cx="${(cx + Math.cos(Math.PI - (9 / 12) * Math.PI) * r).toFixed(2)}"
      cy="${(cyy - Math.sin(Math.PI - (9 / 12) * Math.PI) * r).toFixed(2)}" r="${(s * 0.03).toFixed(2)}"
      fill="${INK}" fill-opacity="${op((k - 0.72) / 0.25)}"/>
  </g>`;
}

function sceneStock(cx, cy, s, k) {
  const x0 = cx - s * 0.46, x1 = cx + s * 0.46;
  const thresh = cy + s * 0.2;
  const n = 48;
  const shown = Math.max(2, Math.ceil(n * outCubic(k)));
  const pts = Array.from({ length: shown }, (_, i) => {
    const u = i / (n - 1);
    const y = cy - s * 0.34 + s * 0.66 * u + Math.sin(u * 9) * s * 0.028;
    return `${i ? 'L' : 'M'} ${lerp(x0, x1, u).toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
  return `<g>
    <line x1="${x0}" y1="${thresh}" x2="${x1}" y2="${thresh}" stroke="${INK}" stroke-opacity="0.22"
      stroke-width="${s * 0.007}" stroke-dasharray="${s * 0.03} ${s * 0.03}"/>
    <path d="${pts}" fill="none" stroke="${INK}" stroke-width="${s * 0.017}" stroke-linejoin="round"/>
    <g opacity="${op((k - 0.78) / 0.22)}">
      <circle cx="${(x1 - s * 0.1).toFixed(2)}" cy="${(thresh + s * 0.015).toFixed(2)}" r="${(s * 0.055).toFixed(2)}"
        fill="none" stroke="${INK}" stroke-width="${s * 0.012}"/>
    </g>
  </g>`;
}

function scenePeople(cx, cy, s, k) {
  const cols = 7, rows = 4, gap = s * 0.145;
  const ring = [3, 9, 16, 24];
  return `<g>${Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x = cx + (c - (cols - 1) / 2) * gap;
    const y = cy + (r - (rows - 1) / 2) * gap;
    const o = clamp((k - i * 0.012) / 0.3);
    const isRing = ring.includes(i);
    const ro = clamp((k - 0.5 - ring.indexOf(i) * 0.07) / 0.3);
    return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(s * 0.026).toFixed(2)}" fill="${INK}"
      fill-opacity="${op(o * (isRing ? 1 : 0.2))}"/>
      ${isRing ? `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(s * 0.062 * outCubic(ro)).toFixed(2)}"
        fill="none" stroke="${INK}" stroke-width="${s * 0.009}" stroke-opacity="${op(ro * 0.8)}"/>` : ''}`;
  }).join('')}</g>`;
}

const INSIGHTS = [
  { draw: sceneBars,   t: 'What actually earns',        b: 'Not what sells most — what pays most.' },
  { draw: sceneArc,    t: 'When you are really busy',   b: 'Staff the hour, not the whole day.' },
  { draw: sceneStock,  t: 'What runs out next',         b: 'Reorder before the shelf is empty.' },
  { draw: scenePeople, t: 'Who is worth bringing back', b: 'And the message that brings them.' },
];

/* ── the system board ─────────────────────────────────────── */
const SYSTEM = [
  { k: 'pos',       n: 'Point of Sale',   b: 'Takes the order, even offline' },
  { k: 'ordering',  n: 'Online Ordering', b: 'Your own app, no commission' },
  { k: 'store',     n: 'Online Store',    b: 'Sells while the shop is shut' },
  { k: 'inventory', n: 'Inventory',       b: 'One count everybody trusts' },
  { k: 'analytics', n: 'Analytics',       b: 'Today, not next month' },
  { k: 'loyalty',   n: 'Loyalty',         b: 'A reason to come back' },
];

/** Small line diagrams for the system rows. */
function glyph(kind, cx, cy, s, p) {
  const k = outCubic(p);
  const sw = s * 0.07;
  const base = `fill="none" stroke="${INK}" stroke-width="${sw.toFixed(2)}" stroke-linecap="square"`;
  switch (kind) {
    case 'pos':
      return `<g>
        <rect x="${cx - s * 0.4}" y="${cy - s * 0.42}" width="${s * 0.8}" height="${s * 0.84}" rx="${s * 0.07}" ${base}/>
        ${[0, 1].map((i) => `<line x1="${cx - s * 0.22}" y1="${cy - s * 0.1 + i * s * 0.24}"
          x2="${cx - s * 0.22 + s * 0.44 * clamp((k - i * 0.2) / 0.5)}" y2="${cy - s * 0.1 + i * s * 0.24}"
          stroke="${INK}" stroke-width="${sw}"/>`).join('')}
      </g>`;
    case 'ordering':
      return `<g>
        <rect x="${cx - s * 0.26}" y="${cy - s * 0.44}" width="${s * 0.52}" height="${s * 0.88}" rx="${s * 0.1}" ${base}/>
        <circle cx="${cx}" cy="${cy - s * 0.44 + s * 0.88 * (0.22 + 0.56 * k)}" r="${s * 0.08}" fill="${INK}"/>
      </g>`;
    case 'store':
      return `<g>${[0, 1, 2, 3].map((i) => {
        const dx = (i % 2 ? 1 : -1) * s * 0.21, dy = (i < 2 ? -1 : 1) * s * 0.21;
        const o = clamp((k - i * 0.14) / 0.4);
        return `<rect x="${cx + dx - s * 0.17}" y="${cy + dy - s * 0.17}" width="${s * 0.34}" height="${s * 0.34}" rx="${s * 0.04}"
          fill="${INK}" fill-opacity="${op(o * (i === 0 ? 1 : 0.2))}" stroke="${INK}" stroke-width="${sw * 0.8}" stroke-opacity="${op(o)}"/>`;
      }).join('')}</g>`;
    case 'inventory':
      return `<g>${[0.48, 0.78, 1.0, 0.62].map((h, i) => {
        const o = clamp((k - i * 0.13) / 0.4);
        const bh = s * 0.74 * h * o;
        return `<rect x="${cx - s * 0.4 + i * s * 0.22}" y="${cy + s * 0.4 - bh}" width="${s * 0.13}" height="${bh}"
          fill="${INK}" fill-opacity="${i === 2 ? 1 : 0.26}"/>`;
      }).join('')}</g>`;
    case 'analytics': {
      const pts = [[-0.42, 0.24], [-0.18, -0.04], [0.04, 0.12], [0.24, -0.24], [0.42, -0.38]];
      const shown = Math.max(2, Math.ceil(pts.length * k));
      const d = pts.slice(0, shown).map((q, i) => `${i ? 'L' : 'M'} ${cx + q[0] * s} ${cy + q[1] * s}`).join(' ');
      return `<g>
        <line x1="${cx - s * 0.44}" y1="${cy + s * 0.4}" x2="${cx + s * 0.44}" y2="${cy + s * 0.4}"
          stroke="${INK}" stroke-width="${sw * 0.7}" stroke-opacity="0.2"/>
        <path d="${d}" ${base} stroke-linejoin="round"/>
      </g>`;
    }
    case 'loyalty':
      return `<g>${[0.2, 0.32, 0.44].map((rr, i) => {
        const o = clamp((k - i * 0.16) / 0.45);
        const c = 2 * Math.PI * (s * rr);
        return `<circle cx="${cx}" cy="${cy}" r="${s * rr}" fill="none" stroke="${INK}" stroke-width="${sw * 0.8}"
          stroke-opacity="${op(1 - i * 0.3)}" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - o)).toFixed(2)}"
          transform="rotate(-90 ${cx} ${cy})"/>`;
      }).join('')}<circle cx="${cx}" cy="${cy}" r="${s * 0.075}" fill="${INK}" fill-opacity="${op((k - 0.5) / 0.3)}"/></g>`;
    default:
      return '';
  }
}

/* ── the film ─────────────────────────────────────────────── */
function frame(t, W, H) {
  const S = Math.min(W, H);
  const cx = W / 2;
  const cy = H / 2;
  const vertical = H > W;
  const f = field(W, H, vertical);
  const dr = S * 0.0048;
  let bg = PAPER;
  let body = '';

  const within = (name) => t >= ACTS[name][0] && t < ACTS[name][1];
  const at = (name) => t - ACTS[name][0];

  /* ── ACT 1 · the mark ───────────────────────────────────── */
  if (within('mark')) {
    bg = INK;
    const l = at('mark');
    const p = cue(l, 0.3, 1.8);
    const out = clamp((l - 3.9) / 0.9);
    const scale = 1 + 0.05 * outCubic(clamp((l - 3.6) / 1.2));
    body += `<g transform="translate(${cx} ${cy}) scale(${scale.toFixed(4)}) translate(${-cx} ${-cy})" opacity="${op(1 - outCubic(out))}">
      ${wordmark(cx, cy - S * 0.01, S * 0.135, { p, fill: PAPER, rot: 110 * outCubic(p) })}
      ${eyebrow('Systems for growing businesses', { x: cx, y: cy + S * 0.165, size: S * 0.0185, fill: DIM, opacity: outExpo(cue(l, 1.9, 1.0)) })}
    </g>`;
  }

  /* ── ACT 2 · the signal ─────────────────────────────────── */
  else if (within('signals')) {
    const l = at('signals');
    const out = clamp((l - 6.1) / 0.7);
    body += `<g opacity="${op(1 - outCubic(out))}">`;
    for (let i = 0; i < N; i++) {
      const born = 0.9 + (i / N) * 4.4 + rnd(i, 5) * 0.18;
      const p = outExpo(cue(l, born, 0.5));
      if (p <= 0.004) continue;
      const s = scatterPos(i, f);
      body += dot(s.x, s.y, dr * (0.6 + 0.4 * p), p * 0.85);
    }
    body += `</g>`;
    const top = vertical ? cy - f.h / 2 - S * 0.14 : cy - f.h / 2 - S * 0.1;
    body += reveal('Every day, your business', { x: cx, y: top, size: S * 0.055, id: 'g1', p: hold(t, ACTS.signals[0] + 0.5, 6.0, 0.7) });
    body += reveal('is telling you something.', { x: cx, y: top + S * 0.07, size: S * 0.055, id: 'g2', p: hold(t, ACTS.signals[0] + 0.7, 5.8, 0.7) });
    const bot = vertical ? cy + f.h / 2 + S * 0.11 : cy + f.h / 2 + S * 0.075;
    body += line('A sale. A shelf going empty. Someone who came back.', {
      x: cx, y: bot, size: S * 0.026, opacity: hold(t, ACTS.signals[0] + 3.3, 3.2, 0.7),
    });
  }

  /* ── ACT 3 · six different places ───────────────────────── */
  else if (within('scatter')) {
    const l = at('scatter');
    const move = inOutCubic(cue(l, 0.1, 1.7));
    const out = clamp((l - 6.3) / 0.7);
    body += `<g opacity="${op(1 - outCubic(out))}">`;

    // dotted reaches between islands that never land
    const reach = cue(l, 2.9, 2.4);
    for (let i = 0; i < ISLANDS.length - 1; i++) {
      const a = ISLANDS[i], b = ISLANDS[i + 1];
      const ax = f.cx + a.x * f.w, ay = f.cy + a.y * f.h;
      const bx = f.cx + b.x * f.w, by = f.cy + b.y * f.h;
      const seg = clamp((reach - i * 0.11) / 0.32) * 0.58;
      if (seg <= 0) continue;
      body += `<line x1="${ax.toFixed(2)}" y1="${ay.toFixed(2)}" x2="${(ax + (bx - ax) * seg).toFixed(2)}" y2="${(ay + (by - ay) * seg).toFixed(2)}"
        stroke="${INK}" stroke-opacity="0.16" stroke-width="${S * 0.0018}" stroke-dasharray="${S * 0.011} ${S * 0.013}"/>`;
    }

    for (let i = 0; i < N; i++) {
      const d = clamp((move - rnd(i, 6) * 0.35) / 0.65);
      const s = scatterPos(i, f);
      const g = islandPos(i, f, S);
      body += dot(lerp(s.x, g.x, outCubic(d)), lerp(s.y, g.y, outCubic(d)), dr, 0.8);
    }

    ISLANDS.forEach((g, i) => {
      const o = outExpo(clamp((cue(l, 1.3, 1.3) - i * 0.07) / 0.5));
      const x = f.cx + g.x * f.w;
      const y = f.cy + g.y * f.h;
      body += line(g.t, { x, y: y + S * 0.088, size: S * 0.0215, opacity: o, fill: MIST });
    });
    body += `</g>`;

    const top = vertical ? cy - f.h / 2 - S * 0.15 : cy - f.h / 2 - S * 0.1;
    body += reveal('It lands in six', { x: cx, y: top, size: S * 0.055, id: 'h1', p: hold(t, ACTS.scatter[0] + 1.9, 2.6, 0.6) });
    body += reveal('different places.', { x: cx, y: top + S * 0.07, size: S * 0.055, id: 'h2', p: hold(t, ACTS.scatter[0] + 2.1, 2.4, 0.6) });
    body += revealRich(`so <tspan font-family="${SERIF}" font-style="italic" font-size="${(S * 0.062).toFixed(2)}">none</tspan> of it gets used.`,
      { x: cx, y: top + S * 0.035, size: S * 0.055, id: 'h3', p: hold(t, ACTS.scatter[0] + 4.9, 1.9, 0.6) });
  }

  /* ── ACT 4 · one place ──────────────────────────────────── */
  else if (within('converge')) {
    const l = at('converge');
    const pull = cue(l, 0.35, 2.6);
    for (let i = 0; i < N; i++) {
      const d = outCubic(clamp((pull - rnd(i, 7) * 0.45) / 0.55));
      const a = islandPos(i, f, S);
      const b = gridPos(i, f, S, vertical);
      body += dot(lerp(a.x, b.x, d), lerp(a.y, b.y, d), dr, lerp(0.8, 1, d));
    }
    // labels dissolve as the dots leave them
    ISLANDS.forEach((g, i) => {
      body += line(g.t, {
        x: f.cx + g.x * f.w, y: f.cy + g.y * f.h + S * 0.088, size: S * 0.0215,
        opacity: 1 - outCubic(cue(l, 0.1 + i * 0.07, 0.7)),
      });
    });
    // the frame that closes around it
    const bp = outCubic(cue(l, 2.5, 1.0));
    if (bp > 0.01) {
      const cols = vertical ? 12 : 22;
      const rows = N / cols;
      const gap = vertical ? S * 0.058 : S * 0.042;
      const bw = (cols - 1) * gap + S * 0.07;
      const bh = (rows - 1) * gap + S * 0.07;
      body += `<rect x="${(f.cx - (bw / 2) * bp).toFixed(2)}" y="${(f.cy - (bh / 2) * bp).toFixed(2)}"
        width="${(bw * bp).toFixed(2)}" height="${(bh * bp).toFixed(2)}" rx="${S * 0.008}"
        fill="none" stroke="${INK}" stroke-opacity="${op(bp * 0.3)}" stroke-width="${S * 0.0018}"/>`;
      body += eyebrow('One record of the business', {
        x: f.cx, y: f.cy + bh / 2 + S * 0.055, size: S * 0.0175, opacity: outExpo(cue(l, 3.3, 0.9)),
      });
    }
    const top = vertical ? cy - f.h / 2 - S * 0.17 : cy - f.h / 2 - S * 0.12;
    body += reveal('Put it in one place', { x: cx, y: top, size: S * 0.056, id: 'k1', p: hold(t, ACTS.converge[0] + 2.0, 3.4, 0.6) });
    body += reveal('and it stops being noise.', { x: cx, y: top + S * 0.071, size: S * 0.056, id: 'k2', p: hold(t, ACTS.converge[0] + 2.2, 3.2, 0.6) });
  }

  /* ── ACT 5 · it starts answering ────────────────────────── */
  else if (within('insight')) {
    const l = at('insight');
    const INTRO = 2.0;
    const SLOT = 2.0;

    if (l < INTRO) {
      // the board recedes to a ghost, so the question can sit on top of it
      const ghost = lerp(1, 0.09, outCubic(cue(l, 0.0, 0.7))) * (1 - outCubic(cue(l, 1.45, 0.5)));
      for (let i = 0; i < N; i++) {
        const g = gridPos(i, f, S, vertical);
        body += dot(g.x, g.y, dr, ghost);
      }
      body += reveal('And then it starts', { x: cx, y: cy - S * 0.02, size: S * 0.058, id: 'i1', p: hold(t, ACTS.insight[0] + 0.15, 1.9, 0.55) });
      body += revealRich(`<tspan font-family="${SERIF}" font-style="italic" font-size="${(S * 0.066).toFixed(2)}">answering</tspan> questions.`,
        { x: cx, y: cy + S * 0.055, size: S * 0.058, id: 'i2', p: hold(t, ACTS.insight[0] + 0.35, 1.7, 0.55) });
    } else {
      const idx = Math.min(INSIGHTS.length - 1, Math.floor((l - INTRO) / SLOT));
      const li = (l - INTRO) - idx * SLOT;
      const sc = INSIGHTS[idx];
      const k = clamp(li / 1.15);
      const leave = clamp((li - (SLOT - 0.38)) / 0.38);
      const gy = vertical ? cy - H * 0.085 : cy - H * 0.055;
      const p = outExpo(clamp(li / 0.7));
      body += `<g opacity="${op(1 - outCubic(leave))}">
        ${sc.draw(cx, gy, S * 0.28, k)}
        ${eyebrow(`0${idx + 1} / 04`, { x: cx, y: gy + S * 0.215, size: S * 0.0155, opacity: p, track: 0.1 })}
        ${reveal(sc.t, { x: cx, y: gy + S * 0.3, size: S * 0.052, id: `q${idx}`, p })}
        ${line(sc.b, { x: cx, y: gy + S * 0.355, size: S * 0.0245, opacity: outExpo(clamp((li - 0.18) / 0.7)) })}
      </g>`;
      // a quiet rule that fills across the four
      const rw = S * 0.34;
      const prog = (idx + clamp(li / SLOT)) / INSIGHTS.length;
      const ry = vertical ? cy + H * 0.23 : cy + H * 0.33;
      body += `<line x1="${cx - rw / 2}" y1="${ry}" x2="${cx + rw / 2}" y2="${ry}" stroke="${INK}" stroke-opacity="0.12" stroke-width="${S * 0.0018}"/>
        <line x1="${cx - rw / 2}" y1="${ry}" x2="${(cx - rw / 2 + rw * prog).toFixed(2)}" y2="${ry}" stroke="${INK}" stroke-width="${S * 0.0018}"/>`;
    }
  }

  /* ── ACT 6 · elevation ──────────────────────────────────── */
  else if (within('climb')) {
    const l = at('climb');
    const k = outCubic(cue(l, 0.3, 2.6));
    const x0 = cx - S * 0.34, x1 = cx + S * 0.34;
    const yb = vertical ? cy + H * 0.1 : cy + H * 0.17;
    const yt = vertical ? cy - H * 0.11 : cy - H * 0.16;
    const n = 70;
    const shown = Math.max(2, Math.ceil(n * k));
    const pt = (i) => {
      const u = i / (n - 1);
      return [lerp(x0, x1, u), yb - (yb - yt) * Math.pow(u, 0.62)];
    };
    const pts = Array.from({ length: shown }, (_, i) => pt(i));
    const d = pts.map((q, i) => `${i ? 'L' : 'M'} ${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(' ');
    const area = `${d} L ${pts[pts.length - 1][0].toFixed(2)} ${yb.toFixed(2)} L ${x0.toFixed(2)} ${yb.toFixed(2)} Z`;
    const out = clamp((l - 4.3) / 0.7);
    body += `<g opacity="${op(1 - outCubic(out))}">
      <line x1="${x0}" y1="${yb}" x2="${x1}" y2="${yb}" stroke="${INK}" stroke-opacity="0.16" stroke-width="${S * 0.0018}"/>
      <path d="${area}" fill="${INK}" fill-opacity="0.05"/>
      <path d="${d}" fill="none" stroke="${INK}" stroke-width="${S * 0.0032}" stroke-linejoin="round"/>
      <circle cx="${pts[pts.length - 1][0].toFixed(2)}" cy="${pts[pts.length - 1][1].toFixed(2)}" r="${S * 0.0075}" fill="${INK}"/>
    </g>`;
    const top = vertical ? cy - H * 0.2 : cy - H * 0.3;
    body += reveal('Small decisions, made daily,', { x: cx, y: top, size: S * 0.042, weight: 400, id: 'e1', p: hold(t, ACTS.climb[0] + 0.6, 4.1, 0.6) });
    body += revealRich(`<tspan font-family="${SERIF}" font-style="italic" font-size="${(S * 0.05).toFixed(2)}">compound.</tspan>`,
      { x: cx, y: top + S * 0.056, size: S * 0.042, id: 'e2', p: hold(t, ACTS.climb[0] + 0.85, 3.9, 0.6) });
    const bot = vertical ? cy + H * 0.17 : cy + H * 0.26;
    body += line('Your business, elevated by what it already knows.', {
      x: cx, y: bot, size: S * 0.026, opacity: hold(t, ACTS.climb[0] + 2.5, 2.1, 0.6), fill: MIST,
    });
  }

  /* ── ACT 7 · the system behind it ───────────────────────── */
  else if (within('system')) {
    const l = at('system');
    const out = clamp((l - 6.3) / 0.7);
    const rowH = vertical ? S * 0.095 : S * 0.082;
    const top = cy - (SYSTEM.length - 1) * rowH / 2 - (vertical ? S * 0.01 : 0);
    const colL = cx - (vertical ? S * 0.37 : S * 0.56);
    const colR = cx + (vertical ? S * 0.37 : S * 0.56);
    body += `<g opacity="${op(1 - outCubic(out))}">`;
    body += eyebrow('Everything it takes to run that', { x: cx, y: top - rowH * 1.15, size: S * 0.0175, opacity: outExpo(cue(l, 0.2, 0.8)) });
    SYSTEM.forEach((r, i) => {
      const p = outExpo(clamp((cue(l, 0.6, 2.8) - i * 0.14) / 0.42));
      if (p <= 0.01) return;
      const y = top + i * rowH;
      body += `<g opacity="${op(p)}" transform="translate(${((1 - p) * S * 0.025).toFixed(2)} 0)">
        <line x1="${colL}" y1="${(y - rowH * 0.5).toFixed(2)}" x2="${colR}" y2="${(y - rowH * 0.5).toFixed(2)}"
          stroke="${INK}" stroke-opacity="0.11" stroke-width="${S * 0.0015}"/>
        ${glyph(r.k, colL + S * 0.032, y, S * 0.05, clamp((cue(l, 0.6, 2.8) - i * 0.14) / 0.5))}
        <text x="${colL + S * 0.085}" y="${(y + S * 0.012).toFixed(2)}" font-family="${SANS}" font-size="${(S * 0.031).toFixed(2)}"
          font-weight="400" fill="${INK}" letter-spacing="${(-S * 0.0006).toFixed(2)}">${esc(r.n)}</text>
        <text x="${colR}" y="${(y + S * 0.011).toFixed(2)}" font-family="${SANS}" font-size="${(S * 0.0225).toFixed(2)}"
          font-weight="400" fill="${MIST}" text-anchor="end">${esc(r.b)}</text>
      </g>`;
    });
    const lastY = top + (SYSTEM.length - 1) * rowH;
    body += `<line x1="${colL}" y1="${(lastY + rowH * 0.5).toFixed(2)}" x2="${colR}" y2="${(lastY + rowH * 0.5).toFixed(2)}"
      stroke="${INK}" stroke-opacity="${op(0.11 * outExpo(cue(l, 2.6, 0.6)))}" stroke-width="${S * 0.0015}"/>`;
    body += line('Take one to start. Add the rest as you grow.', {
      x: cx, y: lastY + rowH * 1.2, size: S * 0.0245, opacity: outExpo(cue(l, 3.6, 1.0)),
    });
    body += `</g>`;
  }

  /* ── ACT 8 · close ──────────────────────────────────────── */
  else {
    bg = INK;
    const l = t - ACTS.close[0];
    body += wordmark(cx, cy - S * 0.055, S * 0.1, { p: outExpo(cue(l, 0.1, 1.0)), fill: PAPER, rot: 35 * outCubic(cue(l, 0.1, 2.2)) });
    body += reveal('Everything your business needs', { x: cx, y: cy + S * 0.09, size: S * 0.031, fill: PAPER, id: 'z1', p: outExpo(cue(l, 0.75, 0.9)) });
    body += revealRich(
      `to run, sell, and <tspan font-family="${SERIF}" font-style="italic" font-size="${(S * 0.039).toFixed(2)}">grow.</tspan>`,
      { x: cx, y: cy + S * 0.138, size: S * 0.031, fill: PAPER, id: 'z2', p: outExpo(cue(l, 0.95, 0.9)) }
    );
    body += eyebrow('floxr.co', { x: cx, y: cy + S * 0.245, size: S * 0.0205, fill: DIM, opacity: outExpo(cue(l, 1.8, 1.0)) });
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${bg}"/>
    ${body}
  </svg>`;
}

/* ── render ───────────────────────────────────────────────── */
const total = FPS * DURATION;
mkdirSync(OUT_DIR, { recursive: true });

// Preview mode: stills, so a composition can be checked without a full render.
if (process.env.FILM_PREVIEW) {
  const fmt = FORMATS[0];
  for (const t of process.env.FILM_PREVIEW.split(',').map(Number)) {
    const svg = frame(t, fmt.W, fmt.H);
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT_DIR, `preview-${String(t).replace('.', '_')}s.png`));
    console.log('preview', t + 's');
  }
  process.exit(0);
}

for (const fmt of FORMATS) {
  const tmp = path.join(OUT_DIR, `.frames-${fmt.id}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });

  for (let i = 0; i < total; i++) {
    const svg = frame(i / FPS, fmt.W, fmt.H);
    const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 1 }).toBuffer();
    writeFileSync(path.join(tmp, `f${String(i).padStart(5, '0')}.png`), buf);
    if (i % 150 === 0) process.stdout.write(`  ${fmt.id} ${i}/${total}\n`);
  }

  const out = path.join(OUT_DIR, `floxr-${fmt.id}.mp4`);
  execFileSync('ffmpeg', [
    '-y', '-framerate', String(FPS),
    '-i', path.join(tmp, 'f%05d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    out,
  ], { stdio: 'ignore' });
  rmSync(tmp, { recursive: true, force: true });
  console.log(`✓ ${out}`);
}
