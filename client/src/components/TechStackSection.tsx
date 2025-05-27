import { techStack } from "@/lib/constants";

export default function TechStackSection() {
  const showTechInfo = (name: string, description: string) => {
    // @ts-ignore
    Swal.fire({
      title: name,
      text: description,
      icon: 'info',
      confirmButtonText: 'Learn More',
      confirmButtonColor: 'var(--primary-color)'
    });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">Technologies We Teach</h2>
          <p className="text-muted">Modern programming languages and frameworks for the next generation</p>
        </div>
        
        <div className="tech-stack">
          {techStack.map((tech) => (
            <div 
              key={tech.name}
              className="tech-item" 
              onClick={() => showTechInfo(tech.name, tech.description)}
            >
              <i className={tech.icon} style={{ color: tech.color }}></i>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
