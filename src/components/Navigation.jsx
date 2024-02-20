import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


// Rinomina il componente di navigazione per evitare conflitti di nomi
export default function Navigation() {
    return (
        <Navbar expand="lg" className="">
      <Container>
        <Navbar.Brand href="#home">Progetto Settimanale</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to="/">Home</Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
