"use client";

import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ChevronIcon } from "@/components/shared/icons";
import { ImageLightbox } from "@/components/product/ImageLightbox";
import type { ProductImage } from "@/lib/types";

interface ImageCarouselProps {
  images: ProductImage[];
  productTitle: string;
  /** Show each image at its own natural aspect ratio instead of the fixed site-wide box. */
  naturalAspectRatio?: boolean;
}

const SWIPE_THRESHOLD = 40;

export function ImageCarousel({ images, productTitle, naturalAspectRatio }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const hasMultiple = images.length > 1;

  const goTo = (index: number) => setActiveIndex((index + images.length) % images.length);
  const goNext = () => goTo(activeIndex + 1);
  const goPrevious = () => goTo(activeIndex - 1);

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta < -SWIPE_THRESHOLD) goNext();
    else if (delta > SWIPE_THRESHOLD) goPrevious();
    touchStartX.current = null;
  };

  const activeImage = images[activeIndex];

  return (
    <div role="group" aria-roledescription="קרוסלת תמונות" aria-label={productTitle}>
      <div
        className={clsx(
          "relative w-full overflow-hidden rounded-2xl bg-brand-gray/40",
          !naturalAspectRatio && "aspect-square sm:aspect-[4/5]"
        )}
        style={naturalAspectRatio ? { aspectRatio: `${activeImage.width} / ${activeImage.height}` } : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="הגדלת תמונה"
            className="absolute inset-0 h-full w-full cursor-zoom-in"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-contain"
              priority={activeIndex === 0}
            />
          </button>
        </motion.div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="התמונה הקודמת"
              className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-white/90 p-2 text-brand-black shadow-sm transition hover:bg-brand-white"
            >
              <ChevronIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="התמונה הבאה"
              className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-white/90 p-2 text-brand-black shadow-sm transition hover:bg-brand-white"
            >
              <ChevronIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`תמונה ${index + 1} מתוך ${images.length}`}
              aria-current={index === activeIndex}
              className={clsx(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-brand-black" : "w-1.5 bg-brand-gray-dark/40"
              )}
            />
          ))}
        </div>
      )}

      {hasMultiple && (
        <div className="mt-4 hidden gap-3 sm:flex">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`תמונה ${index + 1} מתוך ${images.length}`}
              aria-current={index === activeIndex}
              className={clsx(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-gray/40 transition-opacity",
                index === activeIndex ? "opacity-100 ring-2 ring-brand-black" : "opacity-60 hover:opacity-90"
              )}
            >
              <Image src={image.src} alt="" fill sizes="80px" className="object-contain" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
