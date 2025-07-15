
import { useState } from "react";

export default function TechStackSection() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  const technologies = [
    {
      name: "Python",
      icon: "fab fa-python",
      color: "#3776ab",
      description: "Python is perfect for beginners! It's easy to read and write, making it ideal for learning programming fundamentals, building games, creating websites, and even working with artificial intelligence.",
      projects: ["Simple Games", "Web Scraping", "Data Analysis", "AI Chatbots"]
    },
    {
      name: "JavaScript",
      icon: "fab fa-js-square",
      color: "#f7df1e",
      description: "JavaScript brings websites to life! Kids learn to create interactive web pages, build browser games, and develop modern web applications that respond to user interactions.",
      projects: ["Interactive Websites", "Browser Games", "Mobile Apps", "Web Animations"]
    },
    {
      name: "HTML/CSS",
      icon: "fab fa-html5",
      color: "#e34f26",
      description: "The foundation of web development! HTML structures content while CSS makes it beautiful. Perfect starting point for kids to see immediate visual results of their code.",
      projects: ["Personal Websites", "Landing Pages", "Responsive Designs", "CSS Animations"]
    },
    {
      name: "Scratch",
      icon: "fas fa-puzzle-piece",
      color: "#ff6b35",
      description: "Visual programming at its best! Scratch uses drag-and-drop blocks to teach programming logic without typing code. Perfect for young beginners to understand programming concepts.",
      projects: ["Animated Stories", "Simple Games", "Interactive Art", "Educational Simulations"]
    },
    {
      name: "Unity",
      icon: "fas fa-cube",
      color: "#000000",
      description: "Professional game development platform! Kids learn C# programming while creating 2D and 3D games. From simple platformers to complex adventures - the possibilities are endless!",
      projects: ["2D Platform Games", "3D Adventures", "VR Experiences", "Mobile Games"]
    },
    {
      name: "React",
      icon: "fab fa-react",
      color: "#61dafb",
      description: "Modern web development framework! Learn to build dynamic, interactive websites and applications. React is used by major companies like Facebook, Netflix, and Airbnb.",
      projects: ["Dynamic Websites", "Social Apps", "E-commerce Sites", "Portfolio Websites"]
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
    <section id="technologies" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <p className="text-uppercase text-muted fw-bold mb-2">
            <span className="text-primary">Modern Technology</span>
          </p>
          <h2 className="mb-4">Technologies We Teach</h2>
          <p className="text-muted">Cutting-edge programming languages and frameworks that power today's digital world</p>
        </div>

        <div className="row g-4">
          {technologies.map((tech, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="modern-card h-100 text-center">
                <div className="card-body">
                  <div 
                    className="feature-icon mx-auto mb-3"
                    style={{ 
                      backgroundColor: `${tech.color}15`,
                      border: `2px solid ${tech.color}`,
                      width: '80px',
                      height: '80px'
                    }}
                  >
                    <i className={tech.icon} style={{ color: tech.color, fontSize: '2.5rem' }}></i>
                  </div>
                  <h5 className="card-title">{tech.name}</h5>
                  <p className="card-text text-muted">
                    {tech.description.substring(0, 100)}...
                  </p>
                  <button 
                    className="btn btn-modern btn-primary-modern"
                    onClick={() => showTechInfo(tech.name)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedTech && selectedTechData && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeTechInfo}
        >
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center">
                  <div 
                    className="feature-icon me-3"
                    style={{ 
                      backgroundColor: `${selectedTechData.color}15`,
                      border: `2px solid ${selectedTechData.color}`,
                      width: '60px',
                      height: '60px'
                    }}
                  >
                    <i className={selectedTechData.icon} style={{ color: selectedTechData.color, fontSize: '2rem' }}></i>
                  </div>
                  <h4 className="modal-title mb-0">{selectedTechData.name}</h4>
                </div>
                <button type="button" className="btn-close" onClick={closeTechInfo}></button>
              </div>
              <div className="modal-body">
                <p className="lead">{selectedTechData.description}</p>
                <h6 className="mt-4 mb-3">What Kids Can Build:</h6>
                <div className="row">
                  {selectedTechData.projects.map((project, idx) => (
                    <div key={idx} className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>{project}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-modern btn-primary-modern" onClick={closeTechInfo}>
                  Get Started with {selectedTechData.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
