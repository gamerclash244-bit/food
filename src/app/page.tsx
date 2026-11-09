import Hero from "@/components/Hero";
import HeroLoop from "@/components/HeroLoop";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroLoop />
      <ProductShowcase />
      <HowItWorks />
      <Footer />
    </main>
  );
}
