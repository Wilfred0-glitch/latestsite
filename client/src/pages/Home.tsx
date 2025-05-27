import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ClassesSection from "@/components/ClassesSection";
import TeachersSection from "@/components/TeachersSection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Navigation />
      <HeroSection />
      <FacilitiesSection />
      <AboutSection />
      <TechStackSection />
      <ClassesSection />
      <TeachersSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
