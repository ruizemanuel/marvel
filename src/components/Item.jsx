import React, { useRef, useState } from 'react'
import ItemModal from './ItemModal';

export default function Item({ item, backgroundColor, colorBarra, colorBarra3, colorBarra4, colorBarra5, colorBarra6 }) {

    const itemRef = useRef(null)

    //Solo los comics tienen una propiedad title
    if (item.title) {
        const title = item.title.replace(/\(\d+\)|#\d+\s?/g, '').replace(/\s+/g, ' ');
        const { date } = item.dates.find((date) => date.type === "onsaleDate");
        const fecha = new Date(date);
        const opciones = { month: 'long', day: 'numeric', year: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('en-US', opciones);

        itemRef.current = { title: title, fecha: fechaFormateada }
    } else {
        itemRef.current = { name: item.name }
    }

    const [show, setShow] = useState(false);
    const handleShowItem = () => setShow(true)



    return (
        <>
            <div className='item-container' onClick={handleShowItem}>
                <div style={{ border: '1px solid #1e1e1e' }} className='img-container'>
                    <img src={`${item.thumbnail.path + '.' + item.thumbnail.extension}`} alt="item" />
                </div>

                <div style={{backgroundColor: colorBarra}} className='barras-container'>
                    <div style={{ backgroundColor: backgroundColor }} className='barra-item'></div>
                    <div style={{ backgroundColor: backgroundColor }} className='barra-item'></div>
                    <div style={{ backgroundColor: colorBarra3 }} className='barra-item'></div>
                    <div style={{ backgroundColor: colorBarra4 }} className='barra-item'></div>
                    <div style={{ backgroundColor: colorBarra5}} className='barra-item'></div>
                    <div style={{ backgroundColor: colorBarra6}} className='barra-item'></div>
                </div>
                <div style={{ height: '150px', backgroundColor: backgroundColor, color: 'white' }}>


                    {
                        item.title !== undefined ?
                            <div>
                                <div style={{ lineHeight: '1' }} className='pt-2 mb-3'>
                                    <div className='d-flex justify-content-between px-2' >
                                        <div style={{ fontSize: '30px' }} className='text-truncate' >{itemRef.current.title}</div>
                                        <div style={{ fontSize: '30px' }}>{`N#${item.issueNumber}`}</div>
                                    </div>
                                    <div className='d-flex justify-content-between px-2' >
                                        <div style={{ fontSize: '20px' }} >PUBLISHED:</div>
                                        <div style={{ fontSize: '20px' }}>{itemRef.current.fecha}</div>
                                    </div>
                                </div>
                                <p className='text-item px-2'>{item.description ? item.description : 'Description not available'}</p>
                            </div>

                            :
                            <div className='d-flex justify-content-between px-2' >
                                <div style={{ fontSize: '30px' }} className='text-truncate' >{itemRef.current.name}</div>
                            </div>
                    }







                </div>
            </div>
            <ItemModal show={show} setShow={setShow} item={item} />
        </>
    )
}
