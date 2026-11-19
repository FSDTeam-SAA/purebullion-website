import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Show the "PB" monogram next to the wordmark (navbar) */
  withMark?: boolean;
  className?: string;
}

/**
 * Pure Bullion logo. Both images are cropped from the Figma source artwork,
 * so the crop offsets below mirror the design exactly.
 */
export default function BrandLogo({ withMark = true, className }: BrandLogoProps) {
  return (
    <Link href="/" aria-label="Pure Bullion home" className={cn("flex items-center gap-2", className)}>
      {withMark && (
        <span className="relative block h-10 w-[39px] shrink-0 overflow-hidden">
          <Image
            src="/images/brand/logo-mark.png"
            alt=""
            width={1254}
            height={1254}
            className="absolute left-[-21.44%] top-[-18.8%] h-[139.49%] w-[143.81%] max-w-none"
          />
        </span>
      )}
      <span className="relative block aspect-[1168/321] h-10 overflow-hidden">
        <Image
          src="/images/brand/logo-wordmark.png"
          alt="Pure Bullion"
          width={1774}
          height={887}
          className="absolute left-[-3.51%] top-[-47.04%] h-[195.33%] w-[107.36%] max-w-none"
        />
      </span>
    </Link>
  );
}
