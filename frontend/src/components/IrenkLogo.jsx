export function IrenkLogo({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#111" />
      <circle cx="35" cy="45" r="8" fill="white" />
      <circle cx="65" cy="45" r="8" fill="white" />
      <circle cx="38" cy="42" r="3" fill="#fff" opacity="0.8" />
      <circle cx="68" cy="42" r="3" fill="#fff" opacity="0.8" />
      <path d="M 40 60 Q 50 70 60 60" stroke="white" strokeWidth="4" strokeLinecap="round" fill="transparent" />
      <ellipse cx="20" cy="55" rx="8" ry="4" fill="#ff6b6b" opacity="0.4" />
      <ellipse cx="80" cy="55" rx="8" ry="4" fill="#ff6b6b" opacity="0.4" />
    </svg>
  );
}
