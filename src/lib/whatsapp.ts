import { siteConfig } from "@/lib/data/site-config";

export function buildWhatsAppUrl(message: string, phone: string = siteConfig.whatsapp.phoneInternational): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppMessage(productName: string, categoryTitle: string): string {
  return [
    "היי מאירה,",
    "",
    "אני מתעניין/ת במוצר הבא:",
    "",
    `מוצר: ${productName}`,
    `קטגוריה: ${categoryTitle}`,
    "",
    "אשמח לקבל פרטים נוספים.",
  ].join("\n");
}
