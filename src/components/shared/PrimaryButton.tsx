import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  size?: "default" | "large";
  className?: string;
  children: ReactNode;
} & ({ href: string; external?: boolean; type?: never } | { href?: undefined; external?: undefined; type?: "button" | "submit" });

const SIZE_CLASSES = {
  default: "w-full px-10 py-4 text-sm sm:w-auto",
  large: "w-full px-10 py-5 text-lg sm:w-auto",
} as const;

export function PrimaryButton(props: PrimaryButtonProps) {
  const { size = "default", className, children } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-3 rounded-full bg-brand-black font-medium tracking-wide text-brand-white transition-colors duration-300 hover:bg-brand-gray-dark",
    SIZE_CLASSES[size],
    className
  );

  if (props.href) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
