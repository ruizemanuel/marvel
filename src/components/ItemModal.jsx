import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export default function ItemModal({ show, setShow, item }) {

  const itemRef = useRef(null)

  //Solo los comics tienen una propiedad title
  if (item.title) {
    const { date } = item.dates.find((date) => date.type === "onsaleDate");
    const fecha = new Date(date);
    const opciones = { month: 'long', day: 'numeric', year: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('en-US', opciones);

    itemRef.current = { fecha: fechaFormateada }
  }

  const handleClose = () => setShow(false)

  console.log('EL ITEM', item)


  return (
    <Modal show={show} onHide={handleClose} animation={false} className='px-3 py-4'>

      <div style={{ border: '1px solid #1e1e1e', position: 'relative' }}>
        <img className='img-modal' src={`${item.thumbnail.path + '.' + item.thumbnail.extension}`} alt="item" />
        <img className='close-icon-modal' src={require('../images/close-icon.png')} alt="close-icon" onClick={handleClose} />
      </div>
      <div className='body-container-modal'>
        {item.title ?
          <div>
            <div className='title-modal text-truncate' >{item.title}</div>
            <table>
              <tr className='description-modal' >
                <td >published:</td>
                <td >{itemRef.current.fecha}</td>
              </tr>
              <tr className='description-modal'>
                <td >writer:</td>
                <td className='description-modal-writer' >
                  {item.creators.items.map((item) => {
                    if (item.role.includes('writer')) {
                      return <div className='description-modal-writer-item'>{item.name}</div>
                    } else {
                      return null
                    }

                  })}

                </td>
              </tr>
              <tr className='description-modal'>
                <td >penciller:</td>
                <td className='description-modal-writer' >
                  {item.creators.items.map((item) => {
                    if (item.role.includes('penciller')) {
                      return <div className='description-modal-writer-item'>{item.name}</div>
                    } else {
                      return null
                    }

                  })}

                </td>
              </tr>
              <tr className='description-modal' >
                <td >Nº pages:</td>
                {item.pageCount !== 0 ? <td >{item.pageCount}</td> : <td >not available</td>}

              </tr>
            </table>



          </div>
          :
          <div>
            <div className='title-modal text-truncate' >{item.name}</div>
          </div>
        }




        {
          item.title ?
            <Link
              to={`/comics/${item.id}`}
              className="ver-detalle-modal"
            >
              Ver detalle
            </Link>
            :

            <Link
              to={`/characters/${item.id}`}
              className="ver-detalle-modal"
            >
              Ver detalle
            </Link>
        }






      </div>




    </Modal>
  )
}
