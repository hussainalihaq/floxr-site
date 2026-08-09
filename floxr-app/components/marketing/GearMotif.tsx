/**
 * The gear from the Floxr mark, drawn oversized as a background motif.
 * Decorative only — hidden from assistive tech.
 */
export default function GearMotif({
  className = '',
  stroke = 'currentColor',
  opacity = 0.09,
  spin = true,
}: {
  className?: string;
  stroke?: string;
  opacity?: number;
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="-24 -24 48 48"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ opacity }}
    >
      <g className={spin ? 'spin-slow' : undefined} style={{ transformOrigin: 'center' }}>
        <circle cx="0" cy="0" r="10" fill="none" stroke={stroke} strokeWidth="1.1" />
        <circle cx="0" cy="0" r="17" fill="none" stroke={stroke} strokeWidth="0.5" strokeDasharray="1 3" />
        <circle cx="0" cy="0" r="3.4" fill={stroke} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            transform={`rotate(${deg})`}
            x="-1.6"
            y="-14"
            width="3.2"
            height="3.6"
            rx="0.4"
            fill={stroke}
          />
        ))}
      </g>
    </svg>
  );
}
