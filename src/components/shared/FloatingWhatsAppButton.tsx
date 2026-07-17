"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/shared/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/data/site-config";

export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppUrl(siteConfig.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שלחו הודעה בוואטסאפ"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-black text-brand-white shadow-lg transition-shadow duration-300 hover:shadow-xl sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </motion.a>
  );
}
