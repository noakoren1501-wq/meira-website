import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

// The last item is always rendered as the current, non-clickable page — every item
// still carries an href since the same list also feeds the BreadcrumbList JSON-LD,
// which requires a URL for every entry including the current page.
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="פירורי לחם" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-gray-dark">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-brand-black">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-opacity hover:opacity-60">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
