import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/shared/icons";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  size?: "default" | "large";
  className?: string;
}

export function WhatsAppButton({
  message,
  label = "שלחו הודעה בוואטסאפ",
  size = "default",
  className,
}: WhatsAppButtonProps) {
  return (
    <PrimaryButton href={buildWhatsAppUrl(message)} external size={size} className={className}>
      <WhatsAppIcon className={size === "large" ? "h-6 w-6" : "h-4 w-4"} />
      {label}
    </PrimaryButton>
  );
}
