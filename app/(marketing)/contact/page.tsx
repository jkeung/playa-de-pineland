import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Playa de Pineland",
  description:
    "Get in touch with Playa de Pineland — questions about sessions, events, or anything beach volleyball.",
};

export default function ContactPage() {
  return (
    <div className="container">
      <Contact />
    </div>
  );
}
