import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Technologies } from "@/components/Technologies";
import { WhyUs } from "@/components/WhyUs";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Technologies />
        <Portfolio />
        <Process />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
