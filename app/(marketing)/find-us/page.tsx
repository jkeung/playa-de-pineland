import type { Metadata } from "next";
import Location from "@/components/Location";

export const metadata: Metadata = {
  title: "Find Us | Playa de Pineland",
  description:
    "Directions and location info for Playa de Pineland beach volleyball courts.",
};

export default function FindUsPage() {
  return (
    <div className="container">
      <Location />
    </div>
  );
}
