'use client';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} href="/" className="fw-bold">
                    <span className="text-primary">My</span>Brand
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">
                        <Nav.Link as={Link} href="/" className="mx-2">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} href="/features" className="mx-2">
                            Features
                        </Nav.Link>
                        <Nav.Link as={Link} href="/pricing" className="mx-2">
                            Pricing
                        </Nav.Link>
                        <Nav.Link as={Link} href="/about" className="mx-2">
                            About
                        </Nav.Link>
                        <Button variant="primary" className="ms-lg-3 mt-2 mt-lg-0">
                            Get Started
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
