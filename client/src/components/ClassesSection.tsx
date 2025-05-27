import { courses } from "@/lib/constants";

export default function ClassesSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="classes" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <p className="text-uppercase text-muted fw-bold mb-2">
            <span className="text-primary">VIP Classes</span>
          </p>
          <h1 className="mb-4">Recommended Coding for Kids VIP Classes</h1>
        </div>
        
        <div className="row g-4">
          {courses.map((course) => (
            <div key={course.id} className="col-lg-4 mb-5">
              <div className="modern-card">
                <img 
                  className="card-img-top" 
                  src={course.image} 
                  alt={`${course.title} Course`} 
                  style={{ height: '250px', objectFit: 'cover' }} 
                />
                <div className="card-body text-center">
                  <h4 className="card-title">{course.title}</h4>
                  <p className="card-text">{course.description}</p>
                </div>
                <div className="card-footer bg-transparent py-4 px-5">
                  <div className="row border-bottom">
                    <div className="col-6 py-1 text-end border-end">
                      <strong>Age of Kids</strong>
                    </div>
                    <div className="col-6 py-1">{course.ageRange}</div>
                  </div>
                </div>
                <div className="text-center pb-4">
                  <button 
                    onClick={() => scrollToSection('contact-us')}
                    className="btn btn-modern btn-primary-modern"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
