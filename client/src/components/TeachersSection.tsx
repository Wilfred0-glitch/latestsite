import { teachers } from "@/lib/constants";

export default function TeachersSection() {
  return (
    <section id="teachers" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">Meet Our Expert Instructors</h2>
          <p className="text-muted">Passionate educators dedicated to nurturing young tech talent</p>
        </div>
        
        <div className="row g-4">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="col-lg-4 col-md-6">
              <div className="modern-card text-center">
                <div className="card-body p-4">
                  <img 
                    src={teacher.image} 
                    alt={`${teacher.name} - ${teacher.title}`} 
                    className="rounded-circle mb-3" 
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                  />
                  <h5 className="card-title">{teacher.name}</h5>
                  <p className="text-muted">{teacher.title}</p>
                  <p className="card-text">{teacher.bio}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="btn btn-sm btn-outline-primary">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
