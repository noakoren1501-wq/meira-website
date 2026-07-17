import Image from "next/image";
import { cn } from "@/lib/cn";

interface ZoomImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

// One consistent aspect ratio for every card image across the site (product cards,
// category cards, featured sections) so the catalog grid always lines up perfectly.
export function ZoomImage({ src, alt, sizes, priority, className }: ZoomImageProps) {
  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-gray/40", className)}>
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
