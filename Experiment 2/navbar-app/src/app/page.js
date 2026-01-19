'use client';

import MyNavbar from '@/components/MyNavbar';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <MyNavbar />

      {/* Hero Section */}
      <section
        className="py-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Build Amazing Web Apps with Next.js
              </h1>
              <p className="lead mb-4">
                Experience the power of modern web development with our professional
                Bootstrap navbar and stunning UI components. Get started in minutes.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button variant="light" size="lg" className="px-4">
                  Get Started Free
                </Button>
                <Button variant="outline-light" size="lg" className="px-4">
                  View Demo
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div
                className="bg-white rounded shadow-lg p-4"
                style={{ opacity: 0.1 }}
              >
                <div style={{ height: '300px' }}></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center display-5 fw-bold mb-5">Key Features</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm hover-card">
                <Card.Body className="p-4">
                  <div className="text-primary mb-3">
                    <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
                    </svg>
                  </div>
                  <Card.Title className="fw-bold">Fully Responsive</Card.Title>
                  <Card.Text className="text-muted">
                    Works seamlessly on all devices - from mobile phones to large desktop screens.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm hover-card">
                <Card.Body className="p-4">
                  <div className="text-success mb-3">
                    <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                  </div>
                  <Card.Title className="fw-bold">Modern Design</Card.Title>
                  <Card.Text className="text-muted">
                    Clean, professional interface built with Bootstrap 5 and modern UI principles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm hover-card">
                <Card.Body className="p-4">
                  <div className="text-danger mb-3">
                    <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                  </div>
                  <Card.Title className="fw-bold">Easy to Use</Card.Title>
                  <Card.Text className="text-muted">
                    Simple, intuitive navigation with React Bootstrap components for rapid development.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4 mb-md-0">
              <h3 className="display-4 fw-bold text-primary">100%</h3>
              <p className="text-muted">Responsive</p>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h3 className="display-4 fw-bold text-success">5+</h3>
              <p className="text-muted">Components</p>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h3 className="display-4 fw-bold text-warning">Fast</h3>
              <p className="text-muted">Performance</p>
            </Col>
            <Col md={3}>
              <h3 className="display-4 fw-bold text-danger">24/7</h3>
              <p className="text-muted">Support</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="mb-0">© 2026 Responsive Navbar App. Built with Next.js & Bootstrap.</p>
            </Col>
          </Row>
        </Container>
      </footer>

      <style jsx global>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </>
  );
}

