"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ChevronIcon, CloseIcon } from "@/components/shared/icons";
import type { ProductImage } from "@/lib/types";

interface ImageLightboxProps {
  images: ProductImage[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 40;
const DOUBLE_TAP_MS = 300;
const ZOOM_PAN_RANGE = 40;

export function ImageLightbox({ images, activeIndex, setActiveIndex, onClose }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastTapRef = useRef(0);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const hasMultiple = images.length > 1;
  const activeImage = images[activeIndex];

  const goTo = (index: number) => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    setActiveIndex((index + images.length) % images.length);
  };
  // RTL site: the "next" action lives on the physical-left button (see ImageCarousel's
  // end-4=next convention), so ArrowLeft advances and ArrowRight goes back.
  const goNext = () => goTo(activeIndex + 1);
  const goPrevious = () => goTo(activeIndex - 1);

  const toggleZoom = () => {
    setZoomed((current) => !current);
    setPan({ x: 0, y: 0 });
  };

  // Focus the dialog, lock body scroll, and restore focus to the trigger on close.
  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    function trapFocus(event: KeyboardEvent) {
      const container = dialogRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") goNext();
      else if (event.key === "ArrowRight") goPrevious();
      else if (event.key === "Tab") trapFocus(event);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    const now = Date.now();
    if (now - lastTapRef.current < DOUBLE_TAP_MS) toggleZoom();
    lastTapRef.current = now;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (zoomed || touchStartX.current === null) {
      touchStartX.current = null;
      return;
    }
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta < -SWIPE_THRESHOLD) goNext();
    else if (delta > SWIPE_THRESHOLD) goPrevious();
    touchStartX.current = null;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -ZOOM_PAN_RANGE;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -ZOOM_PAN_RANGE;
    setPan({ x, y });
  };

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="תצוגת תמונה מוגדלת"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-black/95 p-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute end-4 top-4 z-10 rounded-full bg-brand-white/10 p-2 text-brand-white hover:bg-brand-white/20"
      >
        <CloseIcon className="h-6 w-6" />
      </button>

      <div
        className={clsx("relative h-full w-full overflow-hidden", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
        onDoubleClick={toggleZoom}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPan({ x: 0, y: 0 })}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="100vw"
          className="object-contain transition-transform duration-200 ease-out"
          style={{ transform: zoomed ? `scale(2) translate(${pan.x}%, ${pan.y}%)` : undefined }}
        />
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goPrevious}
            aria-label="התמונה הקודמת"
            className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-white/10 p-3 text-brand-white hover:bg-brand-white/20"
          >
            <ChevronIcon className="h-6 w-6 rotate-180" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="התמונה הבאה"
            className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-white/10 p-3 text-brand-white hover:bg-brand-white/20"
          >
            <ChevronIcon className="h-6 w-6" />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-brand-white/70">
            {activeIndex + 1} / {images.length}
          </p>
        </>
      )}
    </motion.div>,
    document.body
  );
}
