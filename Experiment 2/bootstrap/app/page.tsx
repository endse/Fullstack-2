'use client';

import { useEffect } from 'react';

export default function Home() {
  // Load Bootstrap JS safely
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            ShopEase
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#offers">
                  Offers
                </a>
              </li>
              <li className="nav-item ms-lg-3">
                <button className="btn btn-outline-light btn-sm">
                  Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-light text-center py-5" style={{ marginTop: '70px' }}>
        <div className="container">
          <h1 className="fw-bold">Smart Shopping Starts Here</h1>
          <p className="text-muted mt-3">
            Discover premium electronics at unbeatable prices
          </p>
          <a href="#products" className="btn btn-primary mt-3">
            Shop Now
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="container py-5">
        <h2 className="fw-bold text-center mb-4">
          Featured Products
        </h2>

        <div className="row g-4">
          {[
            { name: 'Smartphone', price: '₹24,999' },
            { name: 'Laptop', price: '₹59,999' },
            { name: 'Headphones', price: '₹3,999' },
            { name: 'Smart Watch', price: '₹6,499' },
          ].map((product, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm">
                <div
                  className="bg-secondary"
                  style={{ height: '140px' }}
                ></div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="fw-semibold">{product.price}</p>
                  <button className="btn btn-outline-primary btn-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="bg-dark text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Limited Time Offers</h2>
          <p className="mt-2">
            Flat 40% off on selected electronics
          </p>
          <button className="btn btn-light mt-3">
            View Deals
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-light py-3 text-center">
        <p className="mb-0 text-muted">
          © 2026 ShopEase | Experiment–4
        </p>
      </footer>
    </>
  );
}
