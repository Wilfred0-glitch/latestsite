import { useEffect, useState } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after clicking a link
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg modern-nav fixed-top ${isScrolled ? "scrolled" : ""}`}
      style={{ height: '80px', padding: '0.5rem 0' }}
    >
      <div className="container">
        <a
          href="#home"
          className="navbar-brand d-flex align-items-center justify-content-center"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          <img
            src="/images/logo-main.png"
            alt="Code Garden Logo"
            style={{ height: "300px", maxHeight: "70px", width: "auto", objectFit: "contain" }}
          />
        </a>
      </div>
    </nav>
  );
}
