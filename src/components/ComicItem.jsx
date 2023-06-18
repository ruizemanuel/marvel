import React, { useState } from 'react'
import ComicModal from './ComicModal';

export default function ComicItem({ comic }) {

    const title = comic.title.replace(/\(\d+\)|#\d+\s?/g, '').replace(/\s+/g, ' ');

    const { date } = comic.dates.find((date) => date.type === "onsaleDate");
    const fecha = new Date(date);
    const opciones = { month: 'long', day: 'numeric', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('en-US', opciones);


    const [show, setShow] = useState(false);
    const handleShowItem = () => setShow(true)



    return (
        <>
            <div className='item-container' onClick={handleShowItem}>
                <div style={{ border: '1px solid #1e1e1e' }} className='img-container'>
                    <img src={`${comic.thumbnail.path + '.' + comic.thumbnail.extension}`} alt="item" />
                </div>

                <div className='barras-container'>
                    <div style={{ backgroundColor: '#ed1d24' }} className='barra-item'></div>
                    <div style={{ backgroundColor: '#ed1d24' }} className='barra-item'></div>
                    <div style={{ backgroundColor: '#d81d23' }} className='barra-item'></div>
                    <div style={{ backgroundColor: '#b91e23' }} className='barra-item'></div>
                    <div style={{ backgroundColor: '#851d21' }} className='barra-item'></div>
                    <div style={{ backgroundColor: '#511d1f' }} className='barra-item'></div>
                </div>
                <div style={{height:'150px',backgroundColor: '#ed1d24', color: 'white'}}>
                    <div style={{ lineHeight: '1' }} className='pt-2 mb-3'>

                        <div className='d-flex justify-content-between px-2' >
                            <div style={{ fontSize: '30px' }} className='text-truncate' >{title}</div>
                            <div style={{ fontSize: '30px' }}>{`N#${comic.issueNumber}`}</div>
                        </div>


                        <div className='d-flex justify-content-between px-2' >
                            <div style={{ fontSize: '20px' }} >PUBLISHED:</div>
                            <div style={{ fontSize: '20px' }}>{fechaFormateada}</div>
                        </div>
                    </div>


                    <p className='text-item px-2'>{comic.description ? comic.description : 'Description not available'}</p>


                </div>
            </div>
            <ComicModal show={show} setShow={setShow} comic={comic} title={title}/>
        </>
    )
}
