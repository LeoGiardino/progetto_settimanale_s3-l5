import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import he from 'he';


export default function Carta({ data }) {

  const titolo = he.decode(data.title.rendered);
  console.log(data);
  return (
    <Link className='text-decoration-none' to={`/card/${data.id}`}>
    <Card chiave={data.id} className='mb-3 carousel-slide' style={{ width: '300px', height: '534px', cursor: 'pointer' }}>
      <Card.Img style={{ height: '360px', width: '300px', objectFit: 'cover' }} variant="top" src={data.yoast_head_json.og_image[0].url} />
      <Card.Body style={{ backgroundColor: 'rgb(240, 195, 187)'}}>
        <Card.Title className='p-3'>{titolo}</Card.Title>
        <Card.Text>
        </Card.Text>
     
      </Card.Body>
    </Card>
    </Link>
  )
}
