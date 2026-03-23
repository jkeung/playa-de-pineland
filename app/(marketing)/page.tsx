import Hero from "@/components/Hero";
import BeachScene from "@/components/BeachScene";
import Training from "@/components/Training";
import Progression from "@/components/Progression";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Coaches from "@/components/Coaches";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Pricing from "@/components/Pricing";
import BookingCalendly from "@/components/BookingCalendly";
import Schedule from "@/components/Schedule";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <Hero />
          <BeachScene />
        </div>
      </section>

      <ScrollReveal><Training /></ScrollReveal>
      <ScrollReveal><Progression /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      {/* <ScrollReveal><Testimonials /></ScrollReveal> */}
      {/* <ScrollReveal><Coaches /></ScrollReveal> */}
      <ScrollReveal><Gallery /></ScrollReveal>
      <ScrollReveal><Events /></ScrollReveal>
      <ScrollReveal><Pricing /></ScrollReveal>
      <ScrollReveal><Schedule /></ScrollReveal>
      <ScrollReveal><BookingCalendly /></ScrollReveal>
    </>
  );
}
