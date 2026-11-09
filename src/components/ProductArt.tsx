import type { ArtKey } from "@/data/products";

// Placeholder illustrations drawn in code. Replace with <Image> photos in /public later.
const ART: Record<ArtKey, JSX.Element> = {
  c: <><path d="M8 64Q50 6 92 64Q82 76 70 68Q50 78 30 68Q18 76 8 64Z" fill="#f3d9a6" /><path d="M33 38L41 68M50 28V70M67 38L59 68" fill="none" /></>,
  b: <><ellipse cx="50" cy="60" rx="40" ry="27" fill="#ecd0a3" /><path d="M28 52Q36 40 43 56M45 44Q53 32 60 50M62 50Q69 40 74 55" fill="none" /></>,
  m: <><rect x="26" y="34" width="48" height="50" rx="9" fill="#fff" /><rect x="22" y="22" width="56" height="14" rx="5" fill="#cfe6c8" /><path d="M34 58H66" fill="none" /></>,
  u: <><path d="M26 56H74L67 88H33Z" fill="#f4c9cf" /><path d="M23 56Q20 32 50 28Q80 32 77 56Z" fill="#fff" /><circle cx="50" cy="20" r="6" fill="#e58b9a" /></>,
  r: <><path d="M12 52H88Q86 86 50 86Q14 86 12 52Z" fill="#fff" /><path d="M20 52Q50 20 80 52Z" fill="#f2cf8a" /></>,
  k: <><circle cx="50" cy="52" r="38" fill="#e2c9a0" /><circle cx="38" cy="42" r="4" fill="#8a6a45" /><circle cx="60" cy="38" r="4" fill="#8a6a45" /><circle cx="56" cy="62" r="4" fill="#8a6a45" /><circle cx="34" cy="64" r="3" fill="#8a6a45" /></>,
};

export default function ProductArt({ art, className = "" }: { art: ArtKey; className?: string }) {
  return <svg viewBox="0 0 100 100" className={`art ${className}`} aria-hidden="true">{ART[art]}</svg>;
}
