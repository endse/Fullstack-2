export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand fw-semibold">
            Experiment–2 | Bootstrap UI
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-5">
        {/* Title Section */}
        <header className="mb-5 text-center">
          <h1 className="fw-bold">
            Designing UI Using Bootstrap Components
          </h1>
          <p className="text-muted mt-2">
            Implementation using React and Next.js Single Page Application
          </p>
          <hr className="mt-4" />
        </header>

        {/* Buttons Section */}
        <section className="mb-5">
          <h4 className="mb-3">1. Button Components</h4>
          <p className="text-muted">
            Bootstrap provides predefined button styles to maintain visual
            consistency and accessibility.
          </p>
          <div>
            <button className="btn btn-primary me-2">Primary</button>
            <button className="btn btn-secondary me-2">Secondary</button>
            <button className="btn btn-success me-2">Success</button>
            <button className="btn btn-danger">Danger</button>
          </div>
        </section>

        {/* Card Section */}
        <section className="mb-5">
          <h4 className="mb-3">2. Card Components</h4>
          <p className="text-muted">
            Cards are flexible content containers used to display structured
            information.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Responsive Layout</h5>
                  <p className="card-text">
                    Bootstrap’s grid system ensures compatibility across
                    different screen sizes.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Reusable Components</h5>
                  <p className="card-text">
                    Pre-built components reduce development effort and improve
                    UI consistency.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Modern UI Design</h5>
                  <p className="card-text">
                    Bootstrap follows modern design principles for professional
                    web applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-5">
          <h4 className="mb-3">3. Form Components</h4>
          <p className="text-muted">
            Forms allow structured user input with built-in styling and
            validation support.
          </p>

          <form className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-light py-3 border-top">
        <div className="container text-center text-muted">
          © 2026 | Experiment-2 | Bootstrap UI using Next.js
        </div>
      </footer>
    </>
  );
}
