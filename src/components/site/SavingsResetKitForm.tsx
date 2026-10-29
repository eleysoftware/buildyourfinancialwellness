import { useQuery } from "@tanstack/react-query";

import { downloadSavingsResetKit, FALLBACK_KIT, fetchSavingsResetKit } from "@/lib/savings-reset-kit";

import { SubscribeForm } from "./SubscribeForm";

export function SavingsResetKitForm() {
  const { data } = useQuery({
    queryKey: ["savings-reset-kit"],
    queryFn: fetchSavingsResetKit,
  });
  const kit = data ?? FALLBACK_KIT;

  return (
    <SubscribeForm
      formTag="SavingsResetKit"
      variant="newsletter"
      withFirstName
      submitLabel="Download"
      successMessage="Thank you! Your Savings Reset Kit is downloading."
      onSuccess={() => {
        if (kit.pdf_url) void downloadSavingsResetKit(kit.pdf_url);
      }}
    />
  );
}
