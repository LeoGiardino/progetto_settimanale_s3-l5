import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import he from 'he';

export default function CardDetails() {

    const { id } = useParams();

    
    
    
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`https://blog.turbotax.intuit.com/wp-json/wp/v2/posts/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return response.json();
        })
        .then(jsonData => {
            console.log('JSON ricevuto:', jsonData);
            setPostData(jsonData);
            setLoading(false);
        })
        .catch(error => {
            console.error('Errore durante la richiesta:', error);
            setError(error);
            setLoading(false);
        });
    }, []);
    
    if (loading) {
        return <div>Caricamento...</div>;
    }
    
    if (error) {
        return <div>Si è verificato un errore: {error.message}</div>;
    }
    
    const titolo = he.decode(postData.title.rendered);
    console.log(id);
    return (
        <>
            <div className='imgDetail' >
                <img src={postData.yoast_head_json.og_image[0].url} alt="" style={{ width: '100%', height: '600px' }} />

                <h4 className='textDetail'>{titolo}</h4>

            </div>
            <div className='articolo'>
                <div 
                    dangerouslySetInnerHTML={{ __html: postData.content.rendered }}

                >

                </div>

            </div>

        </>
    )
}
