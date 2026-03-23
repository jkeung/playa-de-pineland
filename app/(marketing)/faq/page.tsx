import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ | Playa de Pineland",
  description:
    "Frequently asked questions about Playa de Pineland — sessions, skill levels, what to bring, and more.",
};

export default function FAQPage() {
  return (
    <div className="container">
      <FAQ />
    </div>
  );
}
