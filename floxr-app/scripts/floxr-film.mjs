/**
 * Floxr brand film — deterministic frame renderer.
 *
 * Every frame is a pure function of time, so the whole film can be rendered
 * offline (sharp → PNG) and stitched by ffmpeg. No browser, no recording.
 *
 *   node scripts/floxr-film.mjs
 */
import sharp from 'sharp';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const FPS = 30;
const DURATION = 40;                       // seconds
const OUT_DIR = process.env.FILM_OUT || path.resolve('film');
const FORMATS = [
  { id: 'vertical',  W: 1080, H: 1920 },   // Reels / Stories / TikTok
  { id: 'landscape', W: 1920, H: 1080 },   // site, LinkedIn, YouTube
];

/* ── palette (matches the site) ───────────────────────────── */
const PAPER = '#FFFFFF';
const INK   = '#101112';
const MIST  = '#63676E';

const SANS  = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const BLACK = 'Arial Black, Arial, sans-serif';
const SERIF = 'Didot, Times New Roman, Georgia, serif';

/* ── easing + timing helpers ──────────────────────────────── */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const outExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const outCubic = (t) => 1 - Math.pow(1 - t, 3);
const inOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** progress of a cue starting at `start` lasting `dur` */
const cue = (t, start, dur) => clamp((t - start) / dur);
/** 0→1→0 window, for things that appear then leave */
const hold = (t, start, dur, fade = 0.45) => {
  const inP = clamp((t - start) / fade);
  const outP = 1 - clamp((t - (start + dur - fade)) / fade);
  return Math.min(outExpo(inP), outCubic(Math.max(0, outP)));
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/* ── drawing primitives ───────────────────────────────────── */

/** A line of type that lifts up from behind a clip. */
function reveal(text, { x, y, size, weight = 500, fill = INK, family = SANS, anchor = 'middle', track = -0.03, p = 1, id }) {
  const dy = (1 - outExpo(p)) * size * 1.15;
  const boxH = size * 1.42;
  return `
  <defs><clipPath id="clip${id}"><rect x="${x - 2200}" y="${y - size}" width="4400" height="${boxH}"/></clipPath></defs>
  <g clip-path="url(#clip${id})">
    <text x="${x}" y="${y}" transform="translate(0 ${dy})"
      font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}"
      text-anchor="${anchor}" letter-spacing="${(track * size).toFixed(2)}">${esc(text)}</text>
  </g>`;
}

/** As `reveal`, but the caller supplies inner markup (e.g. a tspan in another face). */
function revealRich(inner, { x, y, size, weight = 500, fill = INK, family = SANS, anchor = 'middle', track = -0.03, p = 1, id }) {
  const dy = (1 - outExpo(p)) * size * 1.15;
  return `
  <defs><clipPath id="clipR${id}"><rect x="${x - 2200}" y="${y - size}" width="4400" height="${size * 1.42}"/></clipPath></defs>
  <g clip-path="url(#clipR${id})">
    <text x="${x}" y="${y}" transform="translate(0 ${dy})"
      font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}"
      text-anchor="${anchor}" letter-spacing="${(track * size).toFixed(2)}">${inner}</text>
  </g>`;
}

/** Small uppercase mono-ish label. */
function eyebrow(text, { x, y, size, fill = MIST, anchor = 'middle', opacity = 1, track = 0.26 }) {
  return `<text x="${x}" y="${y}" font-family="${SANS}" font-size="${size}" font-weight="400"
    fill="${fill}" fill-opacity="${opacity.toFixed(3)}" text-anchor="${anchor}"
    letter-spacing="${(size * track).toFixed(2)}">${esc(text.toUpperCase())}</text>`;
}

/** The Floxr gear, drawn with a progressive stroke. */
function gear(cx, cy, r, { p = 1, rot = 0, fill = INK }) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315]
    .filter((_, i) => i / 8 < p * 1.05)
    .map((deg) => {
      const s = r * 0.285;
      return `<rect transform="rotate(${deg})" x="${-s / 2}" y="${-r * 1.0}" width="${s}" height="${s * 1.1}" rx="${s * 0.12}" fill="${fill}"/>`;
    })
    .join('');
  const circ = 2 * Math.PI * (r * 0.72);
  return `
  <g transform="translate(${cx} ${cy}) rotate(${rot})">
    <circle cx="0" cy="0" r="${r * 0.72}" fill="none" stroke="${fill}" stroke-width="${r * 0.28}"
      stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - outCubic(p))}" transform="rotate(-90)"/>
    <circle cx="0" cy="0" r="${r * 0.25}" fill="${fill}" fill-opacity="${clamp((p - 0.45) / 0.3).toFixed(3)}"/>
    ${teeth}
  </g>`;
}

/** Wordmark: fl [gear] xr, matching the brand lockup. */
function wordmark(cx, cy, size, { p = 1, fill = INK, rot = 0 }) {
  const gapR = size * 0.315;
  const half = size * 0.375;   // gear radius + the same optical gap used in the logo
  return `
  <g>
    <text x="${cx - half}" y="${cy + size * 0.36}" font-family="${BLACK}" font-size="${size}" font-weight="900"
      fill="${fill}" fill-opacity="${outExpo(clamp((p - 0.1) / 0.5)).toFixed(3)}" text-anchor="end"
      letter-spacing="${-size * 0.02}">fl</text>
    ${gear(cx, cy, gapR, { p, rot, fill })}
    <text x="${cx + half}" y="${cy + size * 0.36}" font-family="${BLACK}" font-size="${size}" font-weight="900"
      fill="${fill}" fill-opacity="${outExpo(clamp((p - 0.2) / 0.5)).toFixed(3)}" text-anchor="start"
      letter-spacing="${-size * 0.02}">xr</text>
  </g>`;
}

/* ── product glyphs: simple line diagrams that draw themselves ── */
function glyph(kind, cx, cy, s, p) {
  const k = outCubic(p);
  const sw = s * 0.045;
  const base = `fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linecap="square"`;
  switch (kind) {
    case 'pos':
      return `<g>
        <rect x="${cx - s / 2}" y="${cy - s * 0.42}" width="${s}" height="${s * 0.84}" rx="${s * 0.06}" ${base}/>
        ${[0, 1, 2].map((i) => `<line x1="${cx - s * 0.3}" y1="${cy - s * 0.18 + i * s * 0.2}" x2="${cx - s * 0.3 + s * 0.6 * clamp((k - i * 0.18) / 0.5)}" y2="${cy - s * 0.18 + i * s * 0.2}" stroke="${INK}" stroke-width="${sw}"/>`).join('')}
      </g>`;
    case 'ordering':
      return `<g>
        <rect x="${cx - s * 0.26}" y="${cy - s * 0.46}" width="${s * 0.52}" height="${s * 0.92}" rx="${s * 0.08}" ${base}/>
        <circle cx="${cx}" cy="${cy - s * 0.46 + s * 0.92 * (0.2 + 0.6 * k)}" r="${s * 0.07}" fill="${INK}"/>
      </g>`;
    case 'store':
      return `<g>${[0, 1, 2, 3].map((i) => {
        const dx = (i % 2 ? 1 : -1) * s * 0.23, dy = (i < 2 ? -1 : 1) * s * 0.23;
        const o = clamp((k - i * 0.14) / 0.4);
        return `<rect x="${cx + dx - s * 0.18}" y="${cy + dy - s * 0.18}" width="${s * 0.36}" height="${s * 0.36}" rx="${s * 0.04}" fill="${INK}" fill-opacity="${(o * (i === 0 ? 1 : 0.22)).toFixed(3)}" stroke="${INK}" stroke-width="${sw}" stroke-opacity="${o.toFixed(3)}"/>`;
      }).join('')}</g>`;
    case 'inventory':
      return `<g>${[0.5, 0.78, 1.0, 0.64].map((h, i) => {
        const o = clamp((k - i * 0.13) / 0.4);
        const bh = s * 0.72 * h * o;
        return `<rect x="${cx - s * 0.42 + i * s * 0.23}" y="${cy + s * 0.4 - bh}" width="${s * 0.14}" height="${bh}" fill="${INK}" fill-opacity="${i === 2 ? 1 : 0.28}"/>`;
      }).join('')}</g>`;
    case 'analytics': {
      const pts = [[-0.45, 0.22], [-0.2, -0.05], [0.02, 0.1], [0.24, -0.26], [0.45, -0.38]];
      const shown = Math.max(2, Math.ceil(pts.length * k));
      const d = pts.slice(0, shown).map((q, i) => `${i ? 'L' : 'M'} ${cx + q[0] * s} ${cy + q[1] * s}`).join(' ');
      return `<g>
        <line x1="${cx - s * 0.48}" y1="${cy + s * 0.42}" x2="${cx + s * 0.48}" y2="${cy + s * 0.42}" stroke="${INK}" stroke-width="${sw}" stroke-opacity="0.25"/>
        <path d="${d}" ${base} stroke-linejoin="round"/>
        <circle cx="${cx + 0.45 * s}" cy="${cy - 0.38 * s}" r="${s * 0.06}" fill="${INK}" fill-opacity="${clamp((k - 0.8) / 0.2).toFixed(3)}"/>
      </g>`;
    }
    case 'loyalty':
      return `<g>${[0.22, 0.34, 0.46].map((rr, i) => {
        const o = clamp((k - i * 0.16) / 0.45);
        const c = 2 * Math.PI * (s * rr);
        return `<circle cx="${cx}" cy="${cy}" r="${s * rr}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-opacity="${(1 - i * 0.28).toFixed(2)}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - o)}" transform="rotate(-90 ${cx} ${cy})"/>`;
      }).join('')}<circle cx="${cx}" cy="${cy}" r="${s * 0.08}" fill="${INK}" fill-opacity="${clamp((k - 0.5) / 0.3).toFixed(3)}"/></g>`;
    default:
      return '';
  }
}

/* ── content ──────────────────────────────────────────────── */
const PATCHWORK = [
  { t: 'Till',            x: -0.30, y: -0.20, r: -7 },
  { t: 'Excel sheet',     x:  0.26, y: -0.27, r:  6 },
  { t: 'WhatsApp orders', x: -0.22, y:  0.02, r:  4 },
  { t: 'Stock register',  x:  0.24, y:  0.08, r: -5 },
  { t: 'Instagram DMs',   x: -0.28, y:  0.24, r:  8 },
  { t: 'Receipt book',    x:  0.22, y:  0.30, r: -4 },
];

const PRODUCTS = [
  { k: 'pos',       n: 'Point of Sale',    b: 'Never stops, even offline' },
  { k: 'ordering',  n: 'Online Ordering',  b: 'Your own app. No commission.' },
  { k: 'store',     n: 'Online Store',     b: 'Sells while you sleep' },
  { k: 'inventory', n: 'Inventory',        b: 'One source of truth' },
  { k: 'analytics', n: 'Analytics',        b: 'Know today, not next month' },
  { k: 'loyalty',   n: 'Loyalty',          b: 'They come back' },
];

/* ── the film ─────────────────────────────────────────────── */
function frame(t, W, H) {
  const S = Math.min(W, H);              // scale unit
  const cx = W / 2;
  const cy = H / 2;
  const vertical = H > W;
  let bg = PAPER;
  let body = '';

  /* ACT 1 — the mark (0–5) */
  if (t < 5.6) {
    bg = INK;
    const p = cue(t, 0.35, 1.9);
    const out = clamp((t - 4.5) / 1.0);
    const scale = 1 + 0.06 * outCubic(clamp((t - 4.4) / 1.2));
    body += `<g transform="translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})" opacity="${(1 - outCubic(out)).toFixed(3)}">
      ${wordmark(cx, cy, S * 0.145, { p, fill: PAPER, rot: 120 * outCubic(p) })}
      ${eyebrow('Software for growing businesses', { x: cx, y: cy + S * 0.19, size: S * 0.019, fill: '#8C9096', opacity: outExpo(cue(t, 2.1, 1.1)) })}
    </g>`;
  }

  /* ACT 2 — the patchwork (5.6–14) */
  else if (t < 14.2) {
    const local = t - 5.6;
    const outP = clamp((t - 13.0) / 1.2);
    body += `<g opacity="${(1 - outCubic(outP)).toFixed(3)}">`;
    PATCHWORK.forEach((item, i) => {
      const p = outExpo(cue(local, 0.25 + i * 0.26, 0.75));
      const jitter = Math.sin((t + i * 1.7) * 2.2) * S * 0.004 * p;
      const px = cx + item.x * W * (vertical ? 1.0 : 0.62);
      const py = cy + item.y * H * (vertical ? 0.82 : 1.0) + jitter;
      body += `<g transform="rotate(${item.r * p} ${px} ${py})" opacity="${p.toFixed(3)}">
        <rect x="${px - S * 0.125}" y="${py - S * 0.034}" width="${S * 0.25}" height="${S * 0.068}" rx="${S * 0.006}"
          fill="none" stroke="${INK}" stroke-opacity="0.22" stroke-width="${S * 0.0022}"/>
        <text x="${px}" y="${py + S * 0.012}" font-family="${SANS}" font-size="${S * 0.027}" font-weight="400"
          fill="${MIST}" text-anchor="middle">${esc(item.t)}</text>
      </g>`;
    });
    // broken connections
    const linkP = cue(local, 2.4, 2.6);
    for (let i = 0; i < 5; i++) {
      const a = PATCHWORK[i], b = PATCHWORK[i + 1];
      const ax = cx + a.x * W * (vertical ? 1.0 : 0.62), ay = cy + a.y * H * (vertical ? 0.82 : 1.0);
      const bx = cx + b.x * W * (vertical ? 1.0 : 0.62), by = cy + b.y * H * (vertical ? 0.82 : 1.0);
      const seg = clamp((linkP - i * 0.12) / 0.3);
      body += `<line x1="${ax}" y1="${ay}" x2="${ax + (bx - ax) * seg * 0.62}" y2="${ay + (by - ay) * seg * 0.62}"
        stroke="${INK}" stroke-opacity="0.16" stroke-width="${S * 0.002}" stroke-dasharray="${S * 0.012} ${S * 0.012}"/>`;
    }
    body += `</g>`;
    const hp = hold(t, 7.4, 5.4, 0.7);
    body += reveal('Most businesses run', { x: cx, y: cy - (vertical ? H * 0.30 : H * 0.33), size: S * 0.062, id: 'p1', p: hp });
    body += reveal('on a patchwork.', { x: cx, y: cy - (vertical ? H * 0.30 : H * 0.33) + S * 0.078, size: S * 0.062, id: 'p2', p: hold(t, 7.6, 5.2, 0.7) });
  }

  /* ACT 3 — the shift (14.2–20) */
  else if (t < 20.2) {
    const local = t - 14.2;
    const sweep = inOut(cue(local, 0.1, 1.5));
    bg = PAPER;
    // a rule sweeps across and leaves order behind it
    const col = cue(local, 1.0, 1.6);
    body += `<rect x="0" y="${cy - S * 0.0012}" width="${W * sweep}" height="${S * 0.0024}" fill="${INK}" opacity="${(1 - outCubic(clamp(col / 0.35))).toFixed(3)}"/>`;
    PRODUCTS.forEach((pr, i) => {
      const p = outExpo(clamp((col - i * 0.08) / 0.5));
      const gap = S * 0.072;
      const y = cy + (i - 2.5) * gap;
      body += `<g opacity="${p.toFixed(3)}" transform="translate(${(1 - p) * S * 0.05} 0)">
        <line x1="${cx - S * 0.30}" y1="${y + gap * 0.42}" x2="${cx + S * 0.30}" y2="${y + gap * 0.42}" stroke="${INK}" stroke-opacity="0.12" stroke-width="${S * 0.0015}"/>
        <text x="${cx - S * 0.30}" y="${y + S * 0.012}" font-family="${SANS}" font-size="${S * 0.030}" fill="${INK}">${esc(pr.n)}</text>
        <text x="${cx + S * 0.30}" y="${y + S * 0.012}" font-family="${SANS}" font-size="${S * 0.021}" fill="${MIST}" text-anchor="end">${esc(pr.b)}</text>
      </g>`;
    });
    const hp = hold(t, 16.6, 3.0, 0.6);
    body += reveal('One system.', { x: cx, y: cy - S * 0.30, size: S * 0.058, id: 's1', p: hp });
    const fade = clamp((t - 19.4) / 0.8);
    if (fade > 0) body += `<rect width="${W}" height="${H}" fill="${PAPER}" opacity="${outCubic(fade).toFixed(3)}"/>`;
  }

  /* ACT 4 — the products (20.2–33.4) */
  else if (t < 33.4) {
    const SLOT = 2.2;
    const idx = Math.min(PRODUCTS.length - 1, Math.floor((t - 20.2) / SLOT));
    const local = (t - 20.2) - idx * SLOT;
    const pr = PRODUCTS[idx];
    const p = outExpo(clamp(local / 0.75));
    const leaving = clamp((local - (SLOT - 0.4)) / 0.4);
    const gy = vertical ? cy - H * 0.10 : cy - H * 0.06;

    body += `<g opacity="${(1 - outCubic(leaving)).toFixed(3)}">
      ${glyph(pr.k, cx, gy, S * 0.20, clamp(local / 1.0))}
    </g>`;
    body += `<g opacity="${(1 - outCubic(leaving)).toFixed(3)}">
      ${eyebrow(`0${idx + 1}`, { x: cx, y: gy + S * 0.195, size: S * 0.017, opacity: p, track: 0.06 })}
      ${reveal(pr.n, { x: cx, y: gy + S * 0.288, size: S * 0.064, id: `n${idx}`, p })}
      ${reveal(pr.b, { x: cx, y: gy + S * 0.352, size: S * 0.027, fill: MIST, weight: 400, id: `b${idx}`, p: outExpo(clamp((local - 0.12) / 0.75)) })}
    </g>`;

    // progress ticks
    const tickW = S * 0.028, tgap = S * 0.012;
    const totalW = PRODUCTS.length * tickW + (PRODUCTS.length - 1) * tgap;
    PRODUCTS.forEach((_, i) => {
      const x = cx - totalW / 2 + i * (tickW + tgap);
      const on = i < idx ? 1 : i === idx ? clamp(local / SLOT) : 0;
      const y = vertical ? cy + H * 0.26 : cy + H * 0.36;
      body += `<rect x="${x}" y="${y}" width="${tickW}" height="${S * 0.0022}" fill="${INK}" fill-opacity="0.14"/>
               <rect x="${x}" y="${y}" width="${tickW * on}" height="${S * 0.0022}" fill="${INK}"/>`;
    });
  }

  /* ACT 5 — proof (33.4–36.8) */
  else if (t < 36.9) {
    bg = INK;
    const local = t - 33.4;
    const out = clamp((local - 2.7) / 0.7);
    body += `<g opacity="${(1 - outCubic(out)).toFixed(3)}">
      ${eyebrow('AmeerGlobal · live since 2026', { x: cx, y: cy - S * 0.10, size: S * 0.019, fill: '#8C9096', opacity: outExpo(cue(local, 0.5, 0.8)) })}
      ${reveal('Profitable within', { x: cx, y: cy + S * 0.01, size: S * 0.068, fill: PAPER, id: 'f1', p: outExpo(cue(local, 0.15, 0.9)) })}
      ${reveal('two months of launch.', { x: cx, y: cy + S * 0.09, size: S * 0.068, fill: PAPER, id: 'f2', p: outExpo(cue(local, 0.3, 0.9)) })}
    </g>`;
  }

  /* ACT 6 — close (36.9–40) */
  else {
    bg = INK;
    const local = t - 36.9;
    body += wordmark(cx, cy - S * 0.045, S * 0.105, { p: outExpo(cue(local, 0.1, 0.9)), fill: PAPER, rot: 40 * outCubic(cue(local, 0.1, 2.0)) });
    body += reveal('Everything your business needs', { x: cx, y: cy + S * 0.105, size: S * 0.032, fill: PAPER, weight: 400, id: 'm1', p: outExpo(cue(local, 0.55, 0.9)) });
    body += revealRich(
      `to run, sell, and <tspan font-family="${SERIF}" font-style="italic" font-size="${S * 0.040}">grow.</tspan>`,
      { x: cx, y: cy + S * 0.155, size: S * 0.032, fill: PAPER, weight: 400, id: 'm2', p: outExpo(cue(local, 0.7, 0.9)) }
    );
    body += eyebrow('floxr.co', { x: cx, y: cy + S * 0.26, size: S * 0.021, fill: '#8C9096', opacity: outExpo(cue(local, 1.3, 0.9)) });
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${bg}"/>
    ${body}
  </svg>`;
}

/* ── render ───────────────────────────────────────────────── */
const total = FPS * DURATION;
mkdirSync(OUT_DIR, { recursive: true });

// Preview mode: render a handful of stills so the composition can be checked
// before committing to a full render.
if (process.env.FILM_PREVIEW) {
  const marks = process.env.FILM_PREVIEW.split(',').map(Number);
  const fmt = FORMATS[0];
  for (const t of marks) {
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

  for (let f = 0; f < total; f++) {
    const svg = frame(f / FPS, fmt.W, fmt.H);
    const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 1 }).toBuffer();
    writeFileSync(path.join(tmp, `f${String(f).padStart(5, '0')}.png`), buf);
    if (f % 150 === 0) process.stdout.write(`  ${fmt.id} ${f}/${total}\n`);
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
