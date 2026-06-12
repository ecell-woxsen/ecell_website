import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import ImpactBanner from "@/components/sections/ImpactBanner";
import Events from "@/components/sections/Events";
import Initiatives from "@/components/sections/Initiatives";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import PitchCTA from "@/components/sections/PitchCTA";
import Affiliations from "@/components/sections/Affiliations";
import Community from "@/components/sections/Community";
import Newsletter from "@/components/sections/Newsletter";
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
      <Team />
      <Testimonials />
      <PitchCTA />
      <Affiliations />
      <Community />
      <Newsletter />
      <Contact />
    </>
  );
}
