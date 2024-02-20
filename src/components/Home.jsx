import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Carta from './Carta'; // Rinominato il componente Card in BlogCard
import Footer from './Footer';

export default function Home() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://blog.turbotax.intuit.com/wp-json/wp/v2/posts')
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

    

    return (
        <>
        
            <h1 className='my-5 text-center'>Articoli</h1>

            <main>
                <div style={{ width: '95%', marginBottom: '50px' }}>

                <div class="carousel-container">

                    {postData.map(post => (
                        <Carta data={post} />
                        ))}
                        </div>
                </div>
            </main>
         
        </>
    );
}
