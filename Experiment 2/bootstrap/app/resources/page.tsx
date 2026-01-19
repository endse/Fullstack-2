export default function Resources() {
  return (
    <main className="container py-5">
      <h1 className="fw-bold mb-4">Learning Resources</h1>
      <p className="text-muted">
        A curated collection of academic references and study materials.
      </p>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Programming Tutorials</h5>
              <p>Beginner to advanced coding materials.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Project Templates</h5>
              <p>Ready-to-use academic project structures.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
