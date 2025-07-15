
import { useState } from "react";

export default function TechStackSection() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  const technologies = [
    {
      name: "Python",
      icon: "fab fa-python",
      color: "#3776ab",
      gradient: "linear-gradient(135deg, #3776ab 0%, #4b8bbe 100%)",
      description: "Python is perfect for beginners! It's easy to read and write, making it ideal for learning programming fundamentals, building games, creating websites, and even working with artificial intelligence.",
      projects: ["Simple Games", "Web Scraping", "Data Analysis", "AI Chatbots"],
      difficulty: "Beginner Friendly",
      popularity: "95%"
    },
    {
      name: "JavaScript",
      icon: "fab fa-js-square",
      color: "#f7df1e",
      gradient: "linear-gradient(135deg, #f7df1e 0%, #ffd93d 100%)",
      description: "JavaScript brings websites to life! Kids learn to create interactive web pages, build browser games, and develop modern web applications that respond to user interactions.",
      projects: ["Interactive Websites", "Browser Games", "Mobile Apps", "Web Animations"],
      difficulty: "Beginner to Intermediate",
      popularity: "98%"
    },
    {
      name: "HTML/CSS",
      icon: "fab fa-html5",
      color: "#e34f26",
      gradient: "linear-gradient(135deg, #e34f26 0%, #f06529 100%)",
      description: "The foundation of web development! HTML structures content while CSS makes it beautiful. Perfect starting point for kids to see immediate visual results of their code.",
      projects: ["Personal Websites", "Landing Pages", "Responsive Designs", "CSS Animations"],
      difficulty: "Beginner",
      popularity: "100%"
    },
    {
      name: "Scratch",
      icon: "fas fa-puzzle-piece",
      color: "#ff6b35",
      gradient: "linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%)",
      description: "Visual programming at its best! Scratch uses drag-and-drop blocks to teach programming logic without typing code. Perfect for young beginners to understand programming concepts.",
      projects: ["Animated Stories", "Simple Games", "Interactive Art", "Educational Simulations"],
      difficulty: "Super Beginner",
      popularity: "90%"
    },
    {
      name: "Unity",
      icon: "fas fa-cube",
      color: "#000000",
      gradient: "linear-gradient(135deg, #000000 0%, #434343 100%)",
      description: "Professional game development platform! Kids learn C# programming while creating 2D and 3D games. From simple platformers to complex adventures - the possibilities are endless!",
      projects: ["2D Platform Games", "3D Adventures", "VR Experiences", "Mobile Games"],
      difficulty: "Intermediate",
      popularity: "85%"
    },
    {
      name: "React",
      icon: "fab fa-react",
      color: "#61dafb",
      gradient: "linear-gradient(135deg, #61dafb 0%, #21d4fd 100%)",
      description: "Modern web development framework! Learn to build dynamic, interactive websites and applications. React is used by major companies like Facebook, Netflix, and Airbnb.",
      projects: ["Dynamic Websites", "Social Apps", "E-commerce Sites", "Portfolio Websites"],
      difficulty: "Advanced",
      popularity: "92%"
    }
  ];

  const showTechInfo = (techName: string) => {
    setSelectedTech(techName);
  };

  const closeTechInfo = () => {
    setSelectedTech(null);
  };

  const selectedTechData = technologies.find(tech => tech.name === selectedTech);

  return (
    <section id="technologies" className="modern-tech-section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="section-badge mb-3">
            <i className="fas fa-rocket me-2"></i>
            Modern Technology
          </div>
          <h2 className="tech-section-title mb-4">
            Technologies We <span className="text-gradient">Teach</span>
          </h2>
          <p className="tech-section-subtitle">
            Master the programming languages and frameworks that power today's digital innovations
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="technologies-grid">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className="tech-card"
              onClick={() => showTechInfo(tech.name)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="tech-card-inner">
                <div className="tech-card-front">
                  <div 
                    className="tech-icon-wrapper"
                    style={{ background: tech.gradient }}
                  >
                    <i className={tech.icon}></i>
                  </div>
                  <h4 className="tech-name">{tech.name}</h4>
                  <div className="tech-difficulty">
                    <span className="difficulty-badge">{tech.difficulty}</span>
                  </div>
                  <div className="tech-popularity">
                    <div className="popularity-bar">
                      <div 
                        className="popularity-fill"
                        style={{ width: tech.popularity, background: tech.gradient }}
                      ></div>
                    </div>
                    <span className="popularity-text">{tech.popularity} Popular</span>
                  </div>
                </div>
                <div className="tech-card-back">
                  <p className="tech-preview">{tech.description.substring(0, 120)}...</p>
                  <button className="learn-more-btn">
                    <i className="fas fa-arrow-right me-2"></i>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <div className="cta-card">
            <h3>Ready to Start Your Coding Journey?</h3>
            <p>Join thousands of kids who are already building amazing projects!</p>
            <button 
              className="btn btn-modern btn-primary-modern btn-lg"
              onClick={() => {
                const contactSection = document.getElementById('contact-us');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <i className="fas fa-play me-2"></i>
              Start Learning Today
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedTech && selectedTechData && (
        <div 
          className="tech-modal-overlay" 
          onClick={closeTechInfo}
        >
          <div className="tech-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div className="d-flex align-items-center">
                <div 
                  className="modal-tech-icon"
                  style={{ background: selectedTechData.gradient }}
                >
                  <i className={selectedTechData.icon}></i>
                </div>
                <div>
                  <h3 className="modal-title">{selectedTechData.name}</h3>
                  <span className="modal-difficulty">{selectedTechData.difficulty}</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={closeTechInfo}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body-custom">
              <p className="modal-description">{selectedTechData.description}</p>
              
              <div className="modal-stats">
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <span>Popularity: {selectedTechData.popularity}</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-graduation-cap"></i>
                  <span>{selectedTechData.difficulty}</span>
                </div>
              </div>

              <h5 className="projects-title">What Kids Can Build:</h5>
              <div className="projects-grid">
                {selectedTechData.projects.map((project, idx) => (
                  <div key={idx} className="project-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{project}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer-custom">
              <button 
                className="btn btn-modern btn-primary-modern btn-lg"
                onClick={() => {
                  closeTechInfo();
                  const contactSection = document.getElementById('contact-us');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <i className="fas fa-rocket me-2"></i>
                Start with {selectedTechData.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
