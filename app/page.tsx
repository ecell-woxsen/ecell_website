import Hero from "@/components/sections/Hero";
// import Marquee from "@/components/archive/Marquee";
import About from "@/components/sections/About";
import ImpactBanner from "@/components/sections/ImpactBanner";
/*
 * RESTORING EVENTS & INITIATIVES SECTIONS:
 * 1. Uncomment the imports below (referencing the archived locations, or move the files back to components/sections).
 * 2. Uncomment the <Events /> and <Initiatives /> JSX components inside the Home function below.
 */
// import Events from "@/components/archive/Events";
// import Initiatives from "@/components/archive/Initiatives";
import PitchCTA from "@/components/sections/PitchCTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          body::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <Hero />
      {/* 
        * RESTORING MARQUEE (MOVING BAR):
        * Uncomment the tag below to render the moving bar again.
        */}
      {/* <Marquee /> */}
      <About />
      <ImpactBanner />
      {/* 
        * RESTORING EVENTS & INITIATIVES SECTIONS:
        * Uncomment the tags below to render them again.
        */}
      {/* <Events /> */}
      {/* <Initiatives /> */}
      <PitchCTA />
      <Contact />
    </>
  );
}
