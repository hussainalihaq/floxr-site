'use client';

import { useState } from 'react';
import AnimatedNumber from '@/components/marketing/AnimatedNumber';
import { PLANS, DEMO_MESSAGE, whatsappLink } from '@/lib/site-content';

const PLAN = PLANS.find((p) => p.featured)!;
const SHIFT = 1 / 3; // share of delivery-app orders assumed to move to the restaurant's own link
const rs = (n: number) => `Rs ${Math.round(n).toLocaleString('en-US')}`;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  show,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  show: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-3">
        <span className="text-[14px] font-light" style={{ color: 'var(--text-2)' }}>{label}</span>
        <span className="text-[15px] font-medium tabular-nums">{show}</span>
      </span>
      <input
        type="range"
        className="calc-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${pct}%` } as React.CSSProperties}
      />
    </label>
  );
}

export default function CommissionCalc() {
  const [orders, setOrders] = useState(20);
  const [ticket, setTicket] = useState(1500);
  const [rate, setRate] = useState(25);

  const paid = orders * 30 * ticket * (rate / 100);
  const kept = paid * SHIFT;
  const net = kept - PLAN.monthly;
  const scale = Math.max(paid, PLAN.monthly);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-px calc-shell">
      <div className="lg:col-span-5 p-7 md:p-10 flex flex-col gap-9" style={{ backgroundColor: 'var(--void)' }}>
        <p className="eyebrow">Your numbers</p>
        <Slider label="Delivery-app orders a day" value={orders} min={5} max={150} step={1} onChange={setOrders} show={`${orders}`} />
        <Slider label="Average order" value={ticket} min={500} max={5000} step={100} onChange={setTicket} show={rs(ticket)} />
        <Slider label="Commission per order" value={rate} min={10} max={35} step={1} onChange={setRate} show={`${rate}%`} />
        <p className="text-[12.5px] font-light leading-relaxed mt-auto" style={{ color: 'var(--text-3)' }}>
          Assumes 30 days a month, and that one in three of those orders moves to your own ordering link.
        </p>
      </div>

      <div className="lg:col-span-7 p-7 md:p-10 flex flex-col" style={{ backgroundColor: 'var(--plane-1)' }}>
        <p className="eyebrow mb-4">Paid to delivery apps each month</p>
        <p className="calc-big">
          <AnimatedNumber value={paid} format={rs} duration={650} />
        </p>

        <div className="flex flex-col gap-4 my-10">
          <div>
            <div className="flex justify-between text-[12.5px] mb-2" style={{ color: 'var(--text-2)' }}>
              <span>Commission</span>
              <span className="tabular-nums">{rs(paid)}</span>
            </div>
            <div className="calc-track"><span className="calc-bar is-ember" style={{ transform: `scaleX(${paid / scale})` }} /></div>
          </div>
          <div>
            <div className="flex justify-between text-[12.5px] mb-2" style={{ color: 'var(--text-2)' }}>
              <span>Floxr {PLAN.name}</span>
              <span className="tabular-nums">{rs(PLAN.monthly)}</span>
            </div>
            <div className="calc-track"><span className="calc-bar" style={{ transform: `scaleX(${PLAN.monthly / scale})` }} /></div>
          </div>
        </div>

        <div className="mt-auto pt-7 border-t hairline flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[14px] font-light mb-1.5" style={{ color: 'var(--text-2)' }}>
              Move a third of them to your own app and keep
            </p>
            <p className="text-[28px] md:text-[32px] font-medium tracking-[-0.03em] leading-none">
              <AnimatedNumber value={kept} format={rs} duration={650} />
              <span className="text-[15px] font-light" style={{ color: 'var(--text-3)' }}> /month</span>
            </p>
            <p className="text-[13px] font-light mt-2" style={{ color: net > 0 ? 'var(--ember)' : 'var(--text-3)' }}>
              {net > 0
                ? `${rs(net)} more than the plan costs.`
                : 'At this volume, start with the Counter plan.'}
            </p>
          </div>
          <a
            href={whatsappLink(`${DEMO_MESSAGE} We do about ${orders} delivery orders a day.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-ink w-fit"
          >
            Show me how
          </a>
        </div>
      </div>
    </div>
  );
}
