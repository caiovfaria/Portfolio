import Image from "next/image";

type BrandLogoProps = {
  href: string;
  label?: string;
  className?: string;
};

export default function BrandLogo({ href, label = "C.Vian — início", className = "" }: BrandLogoProps) {
  return (
    <a className={`brand brand-logo ${className}`.trim()} href={href} aria-label={label}>
      <Image
        className="brand-mark"
        src="/brand/cv-logo.png"
        alt=""
        width={48}
        height={48}
        priority
        unoptimized
        aria-hidden="true"
      />
      <span className="brand-wordmark">
        <strong>C.Vian</strong>
        <small>WEB / SYSTEMS</small>
      </span>
    </a>
  );
}
