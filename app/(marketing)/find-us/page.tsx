import type { Metadata } from "next";
import Location from "@/components/Location";

export const metadata: Metadata = {
  title: "Find Us | Playa de Pineland",
  description:
    "Location info for Playa de Pineland, a private backyard beach volleyball court on Pineland Street in Fairfax, VA.",
};

export default function FindUsPage() {
  return (
    <div className="container">
      <Location />
    </div>
  );
}
