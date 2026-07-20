import Image from "next/image";
import { cn } from "@/lib/cn";

interface ZoomImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Show the image at this ratio (e.g. "976 / 793") instead of the standard 4:5 box. */
  aspectRatio?: string;
}

// One consistent aspect ratio for every card image across the site (product cards,
// category cards, featured sections) so the catalog grid always lines up perfectly —
// unless the caller opts a specific image out via aspectRatio.
export function ZoomImage({ src, alt, sizes, priority, className, aspectRatio }: ZoomImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-brand-gray/40",
        !aspectRatio && "aspect-[4/5]",
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}
