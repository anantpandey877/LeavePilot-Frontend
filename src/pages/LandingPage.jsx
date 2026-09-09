import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <main id="home" className="landing-page">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AboutSection />
      <Footer />
    </main>
  );
}

export default LandingPage;
