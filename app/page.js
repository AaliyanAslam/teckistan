import Image from "next/image";
import Navbar from "./components/layout/Navbar";
import TeckistanHero from "./components/layout/Hero";
import ServicesSection from "./components/layout/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <TeckistanHero />
      <ServicesSection />
    </>
  );
}
