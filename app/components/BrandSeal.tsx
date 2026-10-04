import Image from "next/image";

export default function BrandSeal() {
  return (
    <Image
      className="brand-seal-image"
      src="/brand/cvf-monogram-white-clean-v1.png"
      alt=""
      width={38}
      height={32}
      unoptimized
      aria-hidden="true"
    />
  );
}
