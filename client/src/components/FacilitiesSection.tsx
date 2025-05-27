export default function FacilitiesSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-code"></i>
              </div>
              <h4>Diverse Learning Paths</h4>
              <p>Code Garden offers varied coding courses, allowing children to explore different aspects and tailor their learning journey</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-book"></i>
              </div>
              <h4>Well-crafted Curriculum</h4>
              <p>Code Garden excels in teaching coding with a seasoned curriculum, ensuring an engaging and effective learning experience for kids</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Safe Learning Environment</h4>
              <p>Parents trust Code Garden for its commitment to providing a secure platform with monitored interactions and privacy measures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
