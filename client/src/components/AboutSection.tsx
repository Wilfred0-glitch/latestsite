export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about-us" className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <img 
              className="img-fluid rounded mb-5 mb-lg-0" 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Code Garden Institute about-us" 
            />
          </div>
          <div className="col-lg-7">
            <p className="text-uppercase text-muted fw-bold mb-2">
              <span className="text-primary">Learn About Us</span>
            </p>
            <h1 className="mb-4">About Code Garden Institute</h1>
            <p>
              In the words of Code Garden Institute C.E.O <strong>Mr. Wilfred .W,</strong> - At Code Garden, we nurture young minds by seamlessly blending offline and online coding classes. Our innovative approach ensures kids embark on a coding journey that transcends digital boundaries, fostering creativity and skills that last a lifetime.
              Join us in cultivating the next generation of tech enthusiasts!
            </p>
            <div className="row pt-2 pb-4">
              <div className="col-6 col-md-4">
                <img 
                  className="img-fluid rounded-circle" 
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  src="/images/ceo-wilfred.jpg" 
                  alt="Wilfred W - CEO Code Garden" 
                />
                <h6 className="mt-2 text-center small">Wilfred .W <br /><span className="text-muted">(C.E.O: Code Garden)</span></h6>
              </div>
              <div className="col-6 col-md-8">
                <ul className="list-unstyled">
                  <li className="py-2 border-top border-bottom">
                    <i className="fa fa-check text-primary me-3"></i>We offer both online and offline classes
                  </li>
                  <li className="py-2 border-bottom">
                    <i className="fa fa-check text-primary me-3"></i>Your kids learn at a time that works for them
                  </li>
                  <li className="py-2 border-bottom">
                    <i className="fa fa-check text-primary me-3"></i>We offer tailored curriculum that fits each kid
                  </li>
                </ul>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('classes')}
              className="btn btn-modern btn-primary-modern"
            >
              Explore Kids Classes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}