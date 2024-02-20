import React, { useEffect, useState } from 'react';
import { Button, Card, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import he from 'he';

export default function Navigation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hideSearch, setHideSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setHideSearch(true);
    } else {
      setHideSearch(false);
    }
  }, [location.pathname]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);

    if (searchTerm) {
      console.log(`Cerca: ${searchTerm}`);
      fetch(`https://blog.turbotax.intuit.com/wp-json/wp/v2/posts?search=${encodeURIComponent(searchTerm)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Errore nella richiesta');
          }
          return response.json();
        })
        .then(jsonData => {
          console.log('Risultati della ricerca:', jsonData);
          setSearchResults(jsonData);
        })
        .catch(error => {
          console.error('Errore durante la richiesta:', error);
        });
    }
  };

  useEffect(() => {
    
    handleSearch({ target: { value: searchTerm } });
  }, [searchTerm]);


  return (
    <>
      <Navbar className='container' expand="lg">
        <Navbar.Brand as={Link} to="/">Progetto Settimanale</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          {!hideSearch && (
            <Form inline className='d-flex ms-auto'>
              <FormControl type="text" placeholder="Search" onChange={handleSearch} className="mr-sm-2 me-2" />
       
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
      {searchTerm.length > 0 && !hideSearch &&  (
  <div>
    <h1 className='my-5 text-center'>Ricerca</h1>
    <main>
      <div style={{ width: '95%', marginBottom: '50px' }}>
        <div className="carousel-container">
          {searchResults.map(result => (
            result.yoast_head_json.og_image &&
            <Link className='text-decoration-none' to={`/card/${result.id}`} key={result.id}>
              <Card key={result.id} className='mb-3 carousel-slide' style={{ width: '300px', height: '534px', cursor: 'pointer' }}>
                <Card.Img style={{ height: '360px', width: '300px', objectFit: 'cover' }} variant="top" src={result.yoast_head_json.og_image[0].url} />
                <Card.Body style={{ backgroundColor: 'rgb(215, 237, 219)' }}>
                  <Card.Title className='p-3'>{he.decode(result.title.rendered)}</Card.Title>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  </div>
)}

    </>
  );
}
