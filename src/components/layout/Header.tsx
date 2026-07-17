"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { MenuIcon } from "@/components/shared/icons";
import { MobileNav } from "@/components/layout/MobileNav";
import { CategoriesDropdown } from "@/components/layout/CategoriesDropdown";
import type { Category } from "@/lib/types";

export function Header({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-gray bg-brand-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Logo size={40} />
        <nav className="hidden items-center gap-10 sm:flex" aria-label="ניווט ראשי">
          <Link
            href="/"
            className="text-sm font-medium tracking-wide text-brand-black transition-opacity hover:opacity-60"
          >
            בית
          </Link>
          <CategoriesDropdown categories={categories} />
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wide text-brand-black transition-opacity hover:opacity-60"
          >
            צור קשר
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="פתיחת תפריט"
          className="rounded-full p-2 text-brand-black sm:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </Container>
      <MobileNav categories={categories} open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
