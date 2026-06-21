import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { BrandShowcase } from "./components/BrandShowcase";
import { GlobalReachMapSection } from "./components/GlobalReachMapSection";
import { BentoGrid } from "./components/BentoGrid";
import { Testimonials } from "./components/Testimonials";
import { LampCTA } from "./components/LampCTA";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="antialiased font-body-md text-body-md bg-background min-h-screen">
      <NavBar />
      <Hero />
      <Stats />
      <Features />
      <BrandShowcase />
      <GlobalReachMapSection />
      <BentoGrid />
      <Testimonials />
      <LampCTA />
      <Footer />
    </div>
  );
}

export default App;
