type KwanzaFrameProps = {
  size?: number;
  className?: string;
  color?: string;
  /** Render the small seed/kwanza-bean marks at each edge midpoint. */
  seeds?: boolean;
  /** Render a second, smaller concentric frame inside the first. */
  nested?: boolean;
  strokeWidth?: number;
};

function seed(cx: number, cy: number, vertical: boolean) {
  const long = 9;
  const short = 4.5;
  const dx = vertical ? short : long;
  const dy = vertical ? long : short;
  return `M ${cx} ${cy - dy} Q ${cx + dx} ${cy} ${cx} ${cy + dy} Q ${cx - dx} ${cy} ${cx} ${cy - dy} Z`;
}

/**
 * The logo's concentric rounded-corner frame, deconstructed into a reusable
 * SVG motif: a rounded square drawn as four dashed arcs (round caps give the
 * bracket-arm ends their curve) with small seed shapes filling the gaps.
 * Used as a section watermark, highlight frame, or subtle background pattern
 * — never as a pasted copy of the full logo.
 */
export function KwanzaFrame({
  size = 120,
  className,
  color = "currentColor",
  seeds = true,
  nested = false,
  strokeWidth = 14,
}: KwanzaFrameProps) {
  const box = 100;
  const inset = strokeWidth / 2 + 4;
  const w = box - inset * 2;
  const r = w * 0.32;

  const innerInset = inset + w * 0.24;
  const innerW = box - innerInset * 2;
  const innerR = innerW * 0.32;
  const innerStroke = Math.max(strokeWidth * 0.5, 3);

  return (
    <svg viewBox={`0 0 ${box} ${box}`} width={size} height={size} className={className} aria-hidden="true">
      <rect
        x={inset}
        y={inset}
        width={w}
        height={w}
        rx={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${w * 0.34} ${w * 0.32}`}
        strokeDashoffset={w * 0.17}
      />
      {nested && (
        <rect
          x={innerInset}
          y={innerInset}
          width={innerW}
          height={innerW}
          rx={innerR}
          fill="none"
          stroke={color}
          strokeWidth={innerStroke}
          strokeLinecap="round"
          strokeDasharray={`${innerW * 0.34} ${innerW * 0.32}`}
          strokeDashoffset={innerW * 0.17}
        />
      )}
      {seeds && (
        <>
          <path d={seed(box / 2, inset - strokeWidth / 2, true)} fill={color} />
          <path d={seed(box / 2, box - inset + strokeWidth / 2, true)} fill={color} />
          <path d={seed(inset - strokeWidth / 2, box / 2, false)} fill={color} />
          <path d={seed(box - inset + strokeWidth / 2, box / 2, false)} fill={color} />
        </>
      )}
    </svg>
  );
}
