import Image from "next/image";
import Navbar from "./components/layout/Navbar";
import TeckistanHero from "./components/layout/Hero";
import ServicesSection from "./components/layout/Services";
import PricingSection from "./components/layout/Pricing";
import PortfolioSection from "./components/layout/Portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <TeckistanHero />
      <ServicesSection />
      <PricingSection />
      <PortfolioSection />
    </>
  );
}
