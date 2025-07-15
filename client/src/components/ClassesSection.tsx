
import { courses } from "@/lib/constants";
import { useState } from "react";

export default function ClassesSection() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = (courseId: number) => {
    setImageErrors(prev => ({ ...prev, [courseId]: true }));
  };

  return (
    <section id="classes" className="py-5 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-5">
          <div className="d-inline-block px-4 py-2 bg-primary bg-opacity-10 rounded-pill mb-3">
            <span className="text-primary fw-bold text-uppercase small">
              <i className="fas fa-star me-2"></i>VIP Classes
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-4 text-dark">
            Recommended Coding for Kids 
            <span className="text-primary"> VIP Classes</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Choose from our expertly designed courses that make learning to code fun, engaging, and age-appropriate
          </p>
        </div>
        
        <div className="row g-4">
          {courses.map((course) => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4">
              <div className="vip-course-card h-100">
                {/* Course Level Badge */}
                <div className="course-level-badge">
                  {course.level}
                </div>

                {/* Image or Icon Fallback */}
                <div className="course-image-container">
                  {!imageErrors[course.id] ? (
                    <img 
                      className="course-image" 
                      src={course.image} 
                      alt={`${course.title} Course`}
                      onError={() => handleImageError(course.id)}
                    />
                  ) : (
                    <div className="course-icon-fallback" style={{ backgroundColor: course.iconColor + '15' }}>
                      <i 
                        className={course.fallbackIcon} 
                        style={{ 
                          color: course.iconColor,
                          fontSize: '4rem'
                        }}
                      ></i>
                    </div>
                  )}
                  <div className="course-overlay">
                    <span className="course-duration">
                      <i className="fas fa-clock me-1"></i>{course.duration}
                    </span>
                  </div>
                </div>

                <div className="card-body p-4">
                  {/* Course Title with Icon */}
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="course-title-icon me-3"
                      style={{ backgroundColor: course.iconColor + '20' }}
                    >
                      <i 
                        className={course.fallbackIcon} 
                        style={{ color: course.iconColor }}
                      ></i>
                    </div>
                    <h4 className="course-title mb-0">{course.title}</h4>
                  </div>

                  <p className="course-description text-muted mb-3">{course.description}</p>

                  {/* Course Highlights */}
                  <div className="course-highlights mb-4">
                    <h6 className="small fw-bold text-dark mb-2">What You'll Learn:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {course.highlights.map((highlight, index) => (
                        <span key={index} className="highlight-tag">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 p-4 pt-0">
                  <div className="course-details mb-3">
                    <div className="detail-item">
                      <i className="fas fa-users text-primary me-2"></i>
                      <span className="fw-semibold">Age Range:</span> {course.ageRange}
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-signal text-success me-2"></i>
                      <span className="fw-semibold">Level:</span> {course.level}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => scrollToSection('contact-us')}
                    className="btn btn-vip-join w-100"
                  >
                    <i className="fas fa-rocket me-2"></i>Join This Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <div className="bg-white rounded-4 shadow-lg p-4 d-inline-block">
            <h5 className="mb-3">
              <i className="fas fa-gift text-warning me-2"></i>
              Ready to Start Your Coding Journey?
            </h5>
            <button 
              onClick={() => scrollToSection('contact-us')}
              className="btn btn-primary btn-lg px-5"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
