import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data/site-config";

const LOGO_ASPECT_RATIO = 377 / 385; // intrinsic height / width of assets/logo/logo.png

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={siteConfig.siteName}>
      <Image
        src="/images/logo/logo.webp"
        alt={siteConfig.siteName}
        width={size}
        height={Math.round(size * LOGO_ASPECT_RATIO)}
        priority
      />
    </Link>
  );
}
