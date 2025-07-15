
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={`modern-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a
          href="#home"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
        >
          <img
            src="/images/logo-main.png"
            alt="Code Garden"
            className="nav-logo"
          />
          <span className="brand-text">Code Garden</span>
        </a>

        <button
          className={`nav-toggle ${isNavOpen ? "active" : ""}`}
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isNavOpen ? "active" : ""}`}>
          {["Home", "Classes", "Teachers"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.toLowerCase().replace(" ", "-"));
              }}
            >
              {item}
            </a>
          ))}
          <a
            key="Contact"
            href="#contact-us"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              // Scroll to the contact information section at the bottom
              const contactSection = document.getElementById('contact-us');
              if (contactSection) {
                const contactInfo = contactSection.querySelector('.border-top');
                if (contactInfo) {
                  const offset = 80;
                  const elementPosition = contactInfo.getBoundingClientRect().top + window.pageYOffset - offset;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                  });
                } else {
                  scrollToSection('contact-us');
                }
              }
              setIsNavOpen(false);
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
