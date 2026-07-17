import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Price } from "@/components/shared/Price";
import { ShareButton } from "@/components/product/ShareButton";
import { buildProductWhatsAppMessage } from "@/lib/whatsapp";
import type { Category, Product } from "@/lib/types";

export function ProductDetails({ product, category }: { product: Product; category: Category }) {
  return (
    <div>
      <Eyebrow>{category.title}</Eyebrow>
      <h1 className="mt-3 text-3xl font-light tracking-tight text-balance text-brand-black sm:text-4xl">
        {product.title}
      </h1>
      <Price product={product} className="mt-4 block text-2xl font-light text-brand-black" />

      <dl className="mt-8 space-y-2 border-t border-brand-gray pt-6 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-brand-gray-dark">מידות</dt>
          <dd className="text-brand-black">{product.dimensions}</dd>
        </div>
      </dl>

      <p className="mt-8 leading-relaxed whitespace-pre-line text-brand-gray-dark">{product.fullDescription}</p>

      <div className="mt-8 rounded-2xl border border-brand-black/10 bg-brand-black/[0.03] px-6 py-5 text-center">
        <p className="text-sm font-medium leading-relaxed text-brand-black">
          🎁 מתנה מיוחדת ממני ל־20 הרוכשים הראשונים
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-gray p-6">
        <p className="text-sm font-medium text-brand-black">אספקה עד בית הלקוח</p>
        <ul className="mt-3 space-y-1.5 text-sm text-brand-gray-dark">
          <li>עד 7 ימי עסקים לאזור צפון</li>
          <li>עד 14 ימי עסקים לאזור מרכז</li>
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton
          size="large"
          label="לרכישה – שליחת הודעה בוואטסאפ"
          message={buildProductWhatsAppMessage(product.whatsappProductName, category.title)}
        />
        <ShareButton title={product.title} />
      </div>
    </div>
  );
}
