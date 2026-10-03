import Image from "next/image";

type BrandLogoProps = {
  href: string;
  label?: string;
  className?: string;
};

export default function BrandLogo({ href, label = "CVF — início", className = "" }: BrandLogoProps) {
  return (
    <a className={`brand brand-logo ${className}`.trim()} href={href}>
      <span className="sr-only">{label}</span>
      <Image
        className="brand-mark"
        src="/brand/cvf-monogram-white-clean-v1.png"
        alt=""
        width={55}
        height={46}
        priority
        unoptimized
        aria-hidden="true"
      />
      <span className="brand-wordmark" aria-hidden="true">
        <small>SOLUÇÕES DIGITAIS</small>
      </span>
    </a>
  );
}
