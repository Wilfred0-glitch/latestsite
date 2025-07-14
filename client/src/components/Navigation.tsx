import { useEffect, useState } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after clicking a link
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg modern-nav fixed-top ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="navbar-brand d-flex align-items-center" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <i className="fas fa-code me-2" style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}></i>
          <span className="fw-bold text-white" style={{ fontSize: '1.8rem' }}>Code Garden</span>
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNav}
          aria-expanded={isNavOpen}
          aria-controls="navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold px-3" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                <i className="fas fa-home me-1"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold px-3" href="#about-us" onClick={(e) => { e.preventDefault(); scrollToSection('about-us'); }}>
                <i className="fas fa-info-circle me-1"></i>About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold px-3" href="#classes" onClick={(e) => { e.preventDefault(); scrollToSection('classes'); }}>
                <i className="fas fa-graduation-cap me-1"></i>Classes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold px-3" href="#teachers" onClick={(e) => { e.preventDefault(); scrollToSection('teachers'); }}>
                <i className="fas fa-chalkboard-teacher me-1"></i>Teachers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold px-3" href="#contact-us" onClick={(e) => { e.preventDefault(); scrollToSection('contact-us'); }}>
                <i className="fas fa-envelope me-1"></i>Contact Us
              </a>
            </li>
          </ul>
          
          <div className="d-flex gap-2">
            <a href="https://wa.me/message/URLNSTYGZ4XUE1?text=Hello,+I+am+interested+in+knowing+more+about+your+courses" target="_blank" rel="noopener noreferrer" className="btn btn-modern btn-outline-modern">
              <i className="fab fa-whatsapp me-1"></i> WhatsApp
            </a>
            <a href="tel:+2348105025758" className="btn btn-modern btn-primary-modern">
              <i className="fas fa-phone me-1"></i> Call Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
