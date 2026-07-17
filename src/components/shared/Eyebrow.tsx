import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm font-medium tracking-[0.15em] text-brand-gray-dark uppercase", className)}>
      {children}
    </p>
  );
}
