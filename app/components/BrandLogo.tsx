type BrandLogoProps = {
  href: string;
  label?: string;
  className?: string;
};

export default function BrandLogo({ href, label = "C.Vian — início", className = "" }: BrandLogoProps) {
  return (
    <a className={`brand brand-logo ${className}`.trim()} href={href} aria-label={label}>
      <svg className="brand-mark" viewBox="0 0 44 44" aria-hidden="true">
        <path className="brand-mark-frame" d="M8 2h28l6 6v28l-6 6H8l-6-6V8z" />
        <path className="brand-mark-c" d="M22 13h-5.5L12 17.5v9l4.5 4.5H22" />
        <path className="brand-mark-v" d="m23 13 4.6 18L32 13" />
        <path className="brand-mark-accent" d="M34 7h3v3" />
      </svg>
      <span className="brand-wordmark">
        <strong>C.Vian</strong>
        <small>WEB / SYSTEMS</small>
      </span>
    </a>
  );
}
