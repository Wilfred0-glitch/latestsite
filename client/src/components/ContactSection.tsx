import { useState } from "react";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleMainContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!formData.get('fullName') || !formData.get('email') || !formData.get('courseInterest')) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Using Formspree for static form handling
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
        alert('Thank you for contacting us! We\'ll respond within 24 hours.');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modern-form">
              <div className="text-center mb-4">
                <h2 className="mb-3">Get In Touch</h2>
                <p className="text-muted">Ready to start your child's coding journey? Contact us today!</p>
              </div>

              <form onSubmit={handleMainContact}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control form-control-modern" 
                      id="fullName" 
                      name="fullName" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control form-control-modern" 
                      id="email" 
                      name="email" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control form-control-modern" 
                      id="phone" 
                      name="phone" 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="childAge" className="form-label">Child's Age</label>
                    <select className="form-control form-control-modern" id="childAge" name="childAge">
                      <option value="">Select Age Range</option>
                      <option value="6-9">6-9 years</option>
                      <option value="10-14">10-14 years</option>
                      <option value="15-19">15-19 years</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="courseInterest" className="form-label">Course Interest *</label>
                    <select className="form-control form-control-modern" id="courseInterest" name="courseInterest" required>
                      <option value="">Select a Course</option>
                      <option value="roblox">Roblox Game Development</option>
                      <option value="website">Website Design</option>
                      <option value="python">Python Programming</option>
                      <option value="scratch">Scratch for Kids</option>
                      <option value="computer-literacy">Computer Literacy</option>
                      <option value="multiple">Multiple Courses</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Additional Message</label>
                    <textarea 
                      className="form-control form-control-modern" 
                      id="message" 
                      name="message" 
                      rows={4} 
                      placeholder="Tell us more about your child's interests or any specific questions..."
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="newsletter" name="newsletter" />
                      <label className="form-check-label" htmlFor="newsletter">
                        Subscribe to our newsletter for coding tips and updates
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-modern btn-primary-modern w-100"
                      disabled={isSubmitting}
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Contact Information */}
              <div className="row mt-5 pt-4 border-top">
                <div className="col-md-4 text-center mb-3">
                  <div className="feature-icon mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <h6>Phone</h6>
                  <p className="text-muted">+234 810 502 5758</p>
                </div>
                <div className="col-md-4 text-center mb-3">
                  <div className="feature-icon mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h6>Address</h6>
                  <p className="text-muted">Rivers State ICT Center, Air Force Road, Nigeria, PortHarcourt</p>
                </div>
                <div className="col-md-4 text-center mb-3">
                  <div className="feature-icon mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h6>Email</h6>
                  <p className="text-muted">info.codegarden@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}