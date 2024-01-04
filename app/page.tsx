import ClientInformations from "@/components/client-informations";
import ClientSignature from "@/components/client-signature";
import WalletBtn from "@/components/wallet-btn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-12 items-center justify-center p-24">
      <WalletBtn />
      <ClientInformations />
      <ClientSignature />
    </main>
  );
}
