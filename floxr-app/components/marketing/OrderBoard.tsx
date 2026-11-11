'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AnimatedNumber from '@/components/marketing/AnimatedNumber';

/**
 * Hero visual: a restaurant's live order screen. Tickets arrive from the
 * owner's own app, table QR codes, and the counter; each one moves from New to
 * Preparing to Ready, and the day's sales tick up with them. Purely
 * illustrative — every value is sample data.
 */

type Source = 'app' | 'qr' | 'counter';
type Ticket = { id: number; src: Source; label: string; items: string; total: number; born: number };

const POOL: Omit<Ticket, 'id' | 'born'>[] = [
  { src: 'app', label: 'Own app · Delivery', items: '2× Zinger burger, Fries', total: 1840 },
  { src: 'qr', label: 'Table 4 · QR', items: 'Chicken karahi (half), 4× Naan', total: 2650 },
  { src: 'counter', label: 'Counter', items: '2× Cappuccino, Brownie', total: 1450 },
  { src: 'app', label: 'Own app · Pickup', items: 'Large pepperoni, 1.5L drink', total: 2390 },
  { src: 'qr', label: 'Table 9 · QR', items: '3× Club sandwich, 3× Mint lemonade', total: 3120 },
  { src: 'counter', label: 'Counter', items: 'Chai, 2× Bun kebab', total: 690 },
  { src: 'app', label: 'Own app · Delivery', items: 'Family deal — 4 burgers', total: 4200 },
];

const NOTES = [
  'Mozzarella running low — reorder sent',
  'Returning customer — loyalty points added',
  'WhatsApp offer delivered to 412 regulars',
];

const STATUS = (age: number) => (age < 2 ? 'New' : age < 4 ? 'Preparing' : 'Ready');
const MAX = 4;
const BEAT = 2600;

const seed = (): Ticket[] =>
  [2, 1, 0].map((n, i) => ({ ...POOL[n], id: 1040 + n, born: -(i * 2 + 1) }));

export default function OrderBoard() {
  const [tick, setTick] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>(seed);
  const [sales, setSales] = useState(84200);
  const [count, setCount] = useState(63);
  const [note, setNote] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tops = useRef(new Map<string, number>());

  // FLIP: tickets already on screen glide down to make room for a new one.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const next = new Map<string, number>();
    list.querySelectorAll<HTMLElement>('[data-id]').forEach((el) => {
      const id = el.dataset.id!;
      const top = el.offsetTop;
      next.set(id, top);
      const prev = tops.current.get(id);
      if (prev !== undefined && prev !== top) {
        el.style.transition = 'none';
        el.style.transform = `translateY(${prev - top}px)`;
        requestAnimationFrame(() => {
          el.style.transition = 'transform .75s cubic-bezier(.16,1,.3,1)';
          el.style.transform = '';
        });
      }
    });
    tops.current = next;
  }, [tickets]);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (rootRef.current) io.observe(rootRef.current);

    let t = 0;
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      t += 1;
      setTick(t);
      const next = POOL[(t + 2) % POOL.length];
      setTickets((cur) => [{ ...next, id: 1043 + t, born: t }, ...cur].slice(0, MAX));
      setSales((s) => s + next.total);
      setCount((c) => c + 1);
      if (t % 3 === 1) setNote((t / 3) | 0);
      if (t % 3 === 2) setNote(null);
    }, BEAT);

    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  // Gentle tilt toward the pointer on devices that have one.
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty('--rx', '0deg');
    tiltRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div ref={rootRef} className="board-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={tiltRef} className="board" role="img" aria-label="Example of the Floxr live order screen with orders arriving from the restaurant's own app, table QR codes, and the counter.">
        <div className="board-top">
          <span className="flex items-center gap-2.5">
            <span className="live-dot" aria-hidden="true" />
            <span className="text-[13px] font-medium tracking-[-0.01em]">Live orders</span>
          </span>
          <span className="eyebrow !tracking-[0.14em]">Gulberg branch</span>
        </div>

        <div className="board-stats">
          <div>
            <p className="board-k">Today</p>
            <p className="board-v">
              Rs <AnimatedNumber value={sales} duration={1100} />
            </p>
          </div>
          <div>
            <p className="board-k">Orders</p>
            <p className="board-v">
              <AnimatedNumber value={count} duration={600} />
            </p>
          </div>
          <div>
            <p className="board-k">Commission</p>
            <p className="board-v" style={{ color: 'var(--ember)' }}>Rs 0</p>
          </div>
        </div>

        <ul ref={listRef} className="board-list" aria-hidden="true">
          {tickets.map((t) => {
            const status = STATUS(tick - t.born);
            return (
              <li key={t.id} data-id={t.id} className="ticket">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className={`src-chip src-${t.src}`}>{t.label}</span>
                  <span className="font-mono text-[11px]" style={{ color: 'var(--text-3)' }}>#{t.id}</span>
                </div>
                <p className="text-[13px] leading-snug truncate mb-2.5" style={{ color: 'var(--text-1)' }}>
                  {t.items}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className={`status-pill is-${status.toLowerCase()}`}>{status}</span>
                  <span className="text-[13px] font-medium tabular-nums">Rs {t.total.toLocaleString('en-US')}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={`board-note ${note !== null ? 'is-on' : ''}`} aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--ember)' }} />
          {NOTES[(note ?? 0) % NOTES.length]}
        </div>
      </div>

      <span className="board-float board-float-a" aria-hidden="true">0% commission</span>
      <span className="board-float board-float-b" aria-hidden="true">Works offline</span>
    </div>
  );
}
