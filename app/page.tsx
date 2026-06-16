import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import ImpactBanner from "@/components/sections/ImpactBanner";
import Events from "@/components/sections/Events";
import Initiatives from "@/components/sections/Initiatives";
import PitchCTA from "@/components/sections/PitchCTA";
import Affiliations from "@/components/sections/Affiliations";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <ImpactBanner />
      <Events />
      <Initiatives />
      <PitchCTA />
      <Affiliations />
      <Contact />
    </>
  );
}
