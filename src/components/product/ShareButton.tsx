"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/shared/icons";
import { FadeIn } from "@/components/shared/FadeIn";
import { cn } from "@/lib/cn";

export function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the native share sheet — nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access blocked — no fallback available
    }
  }

  return (
    <div className="relative inline-flex w-full sm:w-auto">
      {copied && (
        <FadeIn className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            role="status"
            className="inline-block rounded-full bg-brand-black px-4 py-1.5 text-xs font-medium text-brand-white shadow-sm"
          >
            הקישור הועתק
          </span>
        </FadeIn>
      )}
      <button
        type="button"
        onClick={handleShare}
        aria-label="שיתוף המוצר"
        className={cn(
          "inline-flex w-full items-center justify-center gap-3 rounded-full border border-brand-black px-10 py-5 text-lg font-medium tracking-wide text-brand-black transition-colors duration-300 hover:bg-brand-black hover:text-brand-white sm:w-auto",
          className
        )}
      >
        <ShareIcon className="h-5 w-5" />
        שיתוף
      </button>
    </div>
  );
}
