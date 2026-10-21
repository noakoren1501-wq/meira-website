"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import { CloseIcon, ChevronDownIcon } from "@/components/shared/icons";
import type { Category } from "@/lib/types";

export function MobileNav({
  categories,
  open,
  onClose,
}: {
  categories: Category[];
  open: boolean;
  onClose: () => void;
}) {
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  if (!open) return null;

  // Always reopen with the categories list collapsed.
  const close = () => {
    setCategoriesExpanded(false);
    onClose();
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-brand-white sm:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-end px-6 py-5">
        <button
          type="button"
          onClick={close}
          aria-label="סגירת תפריט"
          className="rounded-full p-2 text-brand-black"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-center justify-center gap-8 pb-12">
        <Link href="/" onClick={close} className="text-2xl font-light text-brand-black">
          בית
        </Link>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Link href="/categories" onClick={close} className="text-2xl font-light text-brand-black">
              קטגוריות
            </Link>
            <button
              type="button"
              onClick={() => setCategoriesExpanded((value) => !value)}
              aria-expanded={categoriesExpanded}
              aria-controls="mobile-nav-categories"
              aria-label={categoriesExpanded ? "סגירת רשימת הקטגוריות" : "פתיחת רשימת הקטגוריות"}
              className="rounded-full p-2 text-brand-black"
            >
              <ChevronDownIcon
                className={clsx("h-5 w-5 transition-transform duration-300", categoriesExpanded && "rotate-180")}
              />
            </button>
          </div>
          <div
            id="mobile-nav-categories"
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: categoriesExpanded ? "1fr" : "0fr" }}
          >
            {/* min-h-0 + overflow-hidden lets the 0fr row actually collapse (grid items default to min-height:auto). */}
            <div className="min-h-0 overflow-hidden" inert={!categoriesExpanded}>
              <div className="flex flex-col items-center gap-4 pt-4">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    onClick={close}
                    className="text-lg font-light text-brand-gray-dark"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link href="/contact" onClick={close} className="text-2xl font-light text-brand-black">
          צור קשר
        </Link>
      </nav>
    </motion.div>,
    document.body
  );
}
