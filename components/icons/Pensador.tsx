type PensadorProps = {
  size?: number;
  className?: string;
  color?: string;
  title?: string;
};

/**
 * Original stylized silhouette of a seated, chin-on-fist thinking figure —
 * the page's secondary signature mark (divider / bullet / favicon), never
 * the literal logo lockup.
 */
export function Pensador({ size = 24, className, color = "currentColor", title }: PensadorProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 130"
      fill={color}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {/* plinth */}
      <rect x="26" y="116" width="48" height="10" rx="1.5" />
      {/* seat rock */}
      <rect x="30" y="100" width="40" height="18" rx="3" />
      {/* rear leg + foot, planted */}
      <path d="M40 100 C 38 88, 40 78, 50 74 C 58 71, 62 76, 60 82 C 58 88, 52 90, 48 96 C 46 100, 44 101, 40 100 Z" />
      {/* torso, hunched forward over the knee */}
      <path d="M45 100 C 40 84, 42 66, 54 56 C 62 49, 70 49, 74 55 C 77 60, 74 64, 68 63 C 60 61, 54 66, 52 76 C 50 86, 52 94, 56 100 Z" />
      {/* forward leg, knee raised, foot on the rock */}
      <path d="M52 100 C 50 90, 54 80, 64 76 C 70 73, 76 76, 74 82 C 72 87, 66 88, 62 92 C 58 96, 58 100, 56 100 Z" />
      {/* upper arm, elbow braced on the raised knee */}
      <path d="M63 78 C 62 71, 66 66, 72 65 C 76 64, 78 67, 76 70 C 73 74, 68 76, 66 80 Z" />
      {/* forearm rising to the chin */}
      <path d="M68 67 C 66 60, 68 53, 74 49 C 78 47, 81 49, 79 53 C 76 58, 72 60, 71 66 Z" />
      {/* fist beneath the chin */}
      <circle cx="76" cy="48" r="6.5" />
      {/* head, tipped forward onto the fist */}
      <circle cx="68" cy="38" r="12" />
    </svg>
  );
}
