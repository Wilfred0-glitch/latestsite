import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { typingTexts } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    studentsCount: 0,
    projectsCount: 0,
    coursesCount: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const finalStats = {
    studentsCount: 500,
    projectsCount: 50,
    coursesCount: 6,
  };

  // Typing effect (matching index.html parameters)
  useEffect(() => {
    if (typingTexts.length === 0) return;

    const typeEffect = () => {
      const currentText = typingTexts[textIndex] || "";

      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % typingTexts.length);
      }
    };

    const timer = setTimeout(typeEffect, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [textIndex, charIndex, isDeleting, typingTexts]);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate students count
          let studentsStart = 0;
          const studentsIncrement = finalStats.studentsCount / 60;
          const studentsTimer = setInterval(() => {
            studentsStart += studentsIncrement;
            if (studentsStart >= finalStats.studentsCount) {
              studentsStart = finalStats.studentsCount;
              clearInterval(studentsTimer);
            }
            setAnimatedStats((prev) => ({
              ...prev,
              studentsCount: Math.floor(studentsStart),
            }));
          }, 30);

          // Animate projects count
          let projectsStart = 0;
          const projectsIncrement = finalStats.projectsCount / 60;
          const projectsTimer = setInterval(() => {
            projectsStart += projectsIncrement;
            if (projectsStart >= finalStats.projectsCount) {
              projectsStart = finalStats.projectsCount;
              clearInterval(projectsTimer);
            }
            setAnimatedStats((prev) => ({
              ...prev,
              projectsCount: Math.floor(projectsStart),
            }));
          }, 35);

          // Animate courses count
          let coursesStart = 0;
          const coursesIncrement = finalStats.coursesCount / 60;
          const coursesTimer = setInterval(() => {
            coursesStart += coursesIncrement;
            if (coursesStart >= finalStats.coursesCount) {
              coursesStart = finalStats.coursesCount;
              clearInterval(coursesTimer);
            }
            setAnimatedStats((prev) => ({
              ...prev,
              coursesCount: Math.floor(coursesStart),
            }));
          }, 40);
        }
      },
      { threshold: 0.5 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);
  const [quickSubmitStatus, setQuickSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleQuickContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!formData.get('name') || !formData.get('email') || !formData.get('course')) {
      toast({
          variant: "destructive",
          title: "Error",
          description: 'Please fill in all fields'
        });
      return;
    }

    setIsQuickSubmitting(true);

    try {
      const contactData = {
        fullName: formData.get('name'),
        email: formData.get('email'),
        phone: '',
        childAge: '',
        courseInterest: formData.get('course'),
        message: 'Quick inquiry from hero section',
        newsletter: false,
        type: 'quick'
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setQuickSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
        toast({
          title: "Interest Received! 🚀",
          description: "We'll contact you soon to discuss the course details. Check your email for next steps!",
          variant: "default"
        });
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setQuickSubmitStatus('idle');
        }, 3000);
      } else {
        setQuickSubmitStatus('error');
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Quick contact error:', error);
      setQuickSubmitStatus('error');
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Please check your connection and try again."
      });
    } finally {
      setIsQuickSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="modern-hero" style={{ paddingTop: "120px" }}>
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6 hero-content">
            <div className="badge bg-secondary mb-3 px-3 py-2">
              Welcome to the Future of Learning
            </div>
            <h1 className="hero-title text-white">
              New Approach to <br />
              <span
                className="typing-effect"
                style={{
                  color: "var(--secondary-color)",
                  display: "inline-block",
                  minWidth: "280px",
                  textAlign: "left",
                  height: "80px",
                  lineHeight: "80px"
                }}
              >
                {typedText}
              </span>
            </h1>
            <p className="hero-subtitle text-white">
              Learn <strong>coding</strong>, <strong>AI</strong>, and{" "}
              <strong>Game Development</strong> through immersive virtual
              small-group classes guided by expert instructors.
            </p>

            {/* Interactive Stats */}
            <div className="row mb-4" ref={statsRef}>
              <div className="col-4 text-center">
                <div className="counter">{animatedStats.studentsCount}+</div>
                <small className="text-white">Students Trained</small>
              </div>
              <div className="col-4 text-center">
                <div className="counter">{animatedStats.projectsCount}+</div>
                <small className="text-white">Projects Built</small>
              </div>
              <div className="col-4 text-center">
                <div className="counter">{animatedStats.coursesCount}</div>
                <small className="text-white">Courses Available</small>
              </div>
            </div>

            <div className="d-flex gap-3 flex-wrap mb-4">
              <button
                onClick={() => scrollToSection("classes")}
                className="btn btn-modern btn-primary-modern"
              >
                <i className="fas fa-graduation-cap me-2"></i>Explore Classes
              </button>
              <button
                onClick={() => scrollToSection("about-us")}
                className="btn btn-modern btn-outline-modern"
              >
                <i className="fas fa-play me-2"></i>Learn More
              </button>
            </div>

            {/* Quick Contact Form */}
            <div className="modern-form mt-5">
              <h5 className="mb-3">
                <i className="fas fa-paper-plane me-2"></i>Quick Course Inquiry
              </h5>
              <form onSubmit={handleQuickContact}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control form-control-modern"
                      name="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <select
                      className="form-control form-control-modern"
                      name="course"
                      required
                    >
                      <option value="">Select Course Interest</option>
                      <option value="roblox">Roblox Game Development</option>
                      <option value="website">Website Design & Development</option>
                      <option value="python">Python Programming</option>
                      <option value="scratch">Scratch for Kids</option>
                      <option value="computer-literacy">Computer Literacy</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="app-development">App Development</option>
                      <option value="data-science">Data Science</option>
                      <option value="javascript">JavaScript Programming</option>
                      <option value="html-css">HTML/CSS Web Design</option>
                      <option value="unity">Unity Game Development</option>
                      <option value="react">React Web Development</option>
                      <option value="multiple">Multiple Courses</option>
                      <option value="scratch">Scratch for Kids</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className={`btn btn-modern btn-primary-modern w-100 ${quickSubmitStatus === 'success' ? 'success-state success-confetti' : ''}`}
                      disabled={isQuickSubmitting}
                    >
                      {quickSubmitStatus === 'success' ? (
                        <div className="success-message">
                          <div className="success-checkmark"></div>
                          Inquiry Successfully Sent!
                        </div>
                      ) : isQuickSubmitting ? (
                          <>
                            <div className="sending-animation me-2">
                              <div className="paper-plane">
                                <i className="fas fa-paper-plane"></i>
                              </div>
                            </div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-send me-2"></i>
                            Send Inquiry
                          </>
                        )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <div className="position-relative">
              <img
                className="img-fluid floating"
                src="/images/hero-vr-kids-3d.png"
                alt="Code Garden Student Learning"
                style={{ maxWidth: "90%" }}
              />

              {/* Floating Code Elements */}
              <div
                className="position-absolute top-0 end-0 floating"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="bg-white rounded p-2 shadow">
                  <code className="code-font text-primary">
                    print("Hello World!")
                  </code>
                </div>
              </div>

              <div
                className="position-absolute bottom-0 start-0 floating"
                style={{ animationDelay: "1s" }}
              >
                <div className="bg-white rounded p-2 shadow">
                  <code className="code-font text-success">
                    &lt;h1&gt;Welcome&lt;/h1&gt;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}