import { Container } from "@/components/shared/Container";
import { WhatsAppIcon } from "@/components/shared/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/data/site-config";

export function Footer() {
  return (
    <footer className="border-t border-brand-gray">
      <Container className="flex flex-col items-center justify-center gap-4 py-8 text-sm text-brand-gray-dark sm:flex-row sm:gap-8">
        <a
          href={buildWhatsAppUrl(siteConfig.whatsapp.defaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
        >
          <WhatsAppIcon className="h-4 w-4" />
          וואטסאפ
        </a>
        <a
          href={siteConfig.termsPdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-60"
        >
          תקנון
        </a>
      </Container>
    </footer>
  );
}
