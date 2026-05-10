import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Initiatives from "@/components/sections/Initiatives";
import Team from "@/components/sections/Team";
import PitchCTA from "@/components/sections/PitchCTA";
import Affiliations from "@/components/sections/Affiliations";
import Community from "@/components/sections/Community";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Events />
      <Initiatives />
      <Team />
      <PitchCTA />
      <Affiliations />
      <Community />
      <Contact />
    </>
  );
}
