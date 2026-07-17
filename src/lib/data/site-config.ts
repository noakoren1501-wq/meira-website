import type { SiteConfig } from "@/lib/types";

// TODO: replace every placeholder value below with real client-supplied content.
export const siteConfig: SiteConfig = {
  siteName: "מאירה קורן",
  siteTagline: "אחד יחיד ומיוחד",

  whatsapp: {
    phoneInternational: "972508803572",
    defaultMessage:
      "היי מאירה, אשמח לשמוע פרטים נוספים על היצירות שלך.",
  },

  termsPdfPath: "/documents/terms-and-conditions.pdf",

  contact: {
    email: "info@example.com",
  },

  home: {
    heroHeadline: "יצירה בעבודת יד, בעין של מעצבת",
    heroSubheadline:
      "בשנים האחרונות התחלתי ליצור מוצרים חדשים ממוצרים קיימים – שילוב בין האהבה שלי לסביבה והרצון לשמר אותה באמצעות מיחזור וחידוש, לבין האהבה שלי ליצירה אישית ולעבודה עם עץ וחומרים מאתגרים ומעניינים.",
    aboutHeading: "קצת עליי",
    aboutText:
      "אני מאירה קורן, מעצבת פנים ויוצרת יצירות בעבודת יד - משלטי עץ ותמונות ממוסגרות ועד ציורים מקוריים. כל יצירה נולדה מתוך אהבה לחומר, לצבע ולפרטים הקטנים.",
  },

  seo: {
    defaultTitle: "מאירה קורן | יצירה בעבודת יד",
    defaultDescription:
      "קטלוג יצירות בעבודת יד מאת מאירה קורן — שלטי עץ, שלטים ממוסגרים, תמונות וציורים מקוריים.",
    // TODO: replace with the real production domain once available.
    siteUrl: "https://www.meirakoren.co.il",
  },
};
