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
          <img src="/images/logo-main.png" alt="Code Garden Logo" style={{ height: '40px', marginRight: '10px' }} />
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
        
        <div 
          className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} 
          id="navbarNav"
          style={{ 
            display: isNavOpen ? 'block' : '', 
            backgroundColor: isNavOpen ? 'rgba(0,0,0,0.95)' : 'transparent',
            position: isNavOpen ? 'absolute' : 'relative',
            top: isNavOpen ? '100%' : 'auto',
            left: isNavOpen ? '0' : 'auto',
            right: isNavOpen ? '0' : 'auto',
            zIndex: 9999,
            padding: isNavOpen ? '1rem' : '0'
          }}
        >
          <ul className="navbar-nav mx-auto" style={{ flexDirection: isNavOpen ? 'column' : 'row' }}>
            <li className="nav-item" style={{ margin: isNavOpen ? '0.5rem 0' : '0' }}>
              <a 
                className="nav-link text-white fw-semibold px-3" 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                style={{ 
                  display: 'block', 
                  padding: isNavOpen ? '0.75rem 1rem' : '0.5rem 0.75rem',
                  borderRadius: isNavOpen ? '0.375rem' : '0',
                  backgroundColor: isNavOpen ? 'transparent' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-home me-1"></i>Home
              </a>
            </li>
            <li className="nav-item" style={{ margin: isNavOpen ? '0.5rem 0' : '0' }}>
              <a 
                className="nav-link text-white fw-semibold px-3" 
                href="#about-us" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about-us'); }}
                style={{ 
                  display: 'block', 
                  padding: isNavOpen ? '0.75rem 1rem' : '0.5rem 0.75rem',
                  borderRadius: isNavOpen ? '0.375rem' : '0',
                  backgroundColor: isNavOpen ? 'transparent' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-info-circle me-1"></i>About Us
              </a>
            </li>
            <li className="nav-item" style={{ margin: isNavOpen ? '0.5rem 0' : '0' }}>
              <a 
                className="nav-link text-white fw-semibold px-3" 
                href="#classes" 
                onClick={(e) => { e.preventDefault(); scrollToSection('classes'); }}
                style={{ 
                  display: 'block', 
                  padding: isNavOpen ? '0.75rem 1rem' : '0.5rem 0.75rem',
                  borderRadius: isNavOpen ? '0.375rem' : '0',
                  backgroundColor: isNavOpen ? 'transparent' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-graduation-cap me-1"></i>Classes
              </a>
            </li>
            <li className="nav-item" style={{ margin: isNavOpen ? '0.5rem 0' : '0' }}>
              <a 
                className="nav-link text-white fw-semibold px-3" 
                href="#teachers" 
                onClick={(e) => { e.preventDefault(); scrollToSection('teachers'); }}
                style={{ 
                  display: 'block', 
                  padding: isNavOpen ? '0.75rem 1rem' : '0.5rem 0.75rem',
                  borderRadius: isNavOpen ? '0.375rem' : '0',
                  backgroundColor: isNavOpen ? 'transparent' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-chalkboard-teacher me-1"></i>Teachers
              </a>
            </li>
            <li className="nav-item" style={{ margin: isNavOpen ? '0.5rem 0' : '0' }}>
              <a 
                className="nav-link text-white fw-semibold px-3" 
                href="#contact-us" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact-us'); }}
                style={{ 
                  display: 'block', 
                  padding: isNavOpen ? '0.75rem 1rem' : '0.5rem 0.75rem',
                  borderRadius: isNavOpen ? '0.375rem' : '0',
                  backgroundColor: isNavOpen ? 'transparent' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  if (isNavOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <i className="fas fa-envelope me-1"></i>Contact Us
              </a>
            </li>
          </ul>
          
          <div 
            className={isNavOpen ? "d-flex flex-column gap-2 mt-3" : "d-flex gap-2"}
            style={{ 
              flexDirection: isNavOpen ? 'column' : 'row',
              marginTop: isNavOpen ? '1rem' : '0'
            }}
          >
            <a 
              href="https://wa.me/message/URLNSTYGZ4XUE1?text=Hello,+I+am+interested+in+knowing+more+about+your+courses" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-modern btn-outline-modern"
              style={{ width: isNavOpen ? '100%' : 'auto' }}
            >
              <i className="fab fa-whatsapp me-1"></i> WhatsApp
            </a>
            <a 
              href="tel:+2348105025758" 
              className="btn btn-modern btn-primary-modern"
              style={{ width: isNavOpen ? '100%' : 'auto' }}
            >
              <i className="fas fa-phone me-1"></i> Call Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
