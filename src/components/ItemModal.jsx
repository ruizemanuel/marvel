import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export default function ItemModal({ show, setShow, item }) {

  const apiRef = useRef(null)

  if (item.title) {
    apiRef.current = 'characters'
  } else {
    apiRef.current = 'comics'
  }

  const [itemsToShow, setItemsToShow] = useState(item[apiRef.current].items.slice(0, 4))
  console.log('PERSONAJE', item[apiRef.current].items.slice(0, 4))
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4
  const ultimaPagina = Math.ceil(item[apiRef.current].items.length / itemsPerPage)
  const handleClose = () => setShow(false)

  // useEffect(() => {
  //     setCharactersToShow([...])
  // }, [])

  const handleSiguiente = () => {
    if (currentPage !== ultimaPagina) {
      const pagina = currentPage + 1
      const ultimoItem = pagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setItemsToShow(item[apiRef.current].items.slice(primerItem, ultimoItem))
      setCurrentPage(pagina)
    }



  }

  const handleAnterior = () => {
    if (currentPage !== 1) {
      const pagina = currentPage - 1
      const ultimoItem = pagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setItemsToShow(item[apiRef.current].items.slice(primerItem, ultimoItem))
      setCurrentPage(pagina)
    }

  }

  return (
    <Modal show={show} onHide={handleClose} animation={false} className='px-3 py-4'>


      <div style={{ border: '1px solid #1e1e1e', position: 'relative' }}>
        <img className='img-modal' src={`${item.thumbnail.path + '.' + item.thumbnail.extension}`} alt="item" />
        <img className='close-icon-modal' src={require('../images/close-icon.png')} alt="close-icon" onClick={handleClose} />
      </div>
      <div className='body-container-modal'>
        {item.title ?
          <div className='d-flex justify-content-between' >
            <div className='title-modal text-truncate' >{item.title}</div>
            <div className='title-modal'>{`N#${item.issueNumber}`}</div>
          </div>
          :
          <div>
            <div className='title-modal text-truncate' >{item.name}</div>
          </div>
        }

        <div className='description-modal'>{item.description ? item.description : 'Description not available'}</div>
        <div className='lista-items-modal'>

          {

            item[apiRef.current].available !== 0 ?

              <div>
                <div className='mt-2'>{`${apiRef.current}:`}</div>
                <ul>
                  {itemsToShow.map((item, index) => {
                    return <li key={index}>
                      {item.name}
                    </li>
                  })}
                </ul>
                <div className='d-flex justify-content-center'>
                  <div style={currentPage === 1 ? { color: 'lightgray' } : { cursor: 'pointer' }} className='me-3' onClick={handleAnterior}>Anterior</div>
                  <div style={currentPage === ultimaPagina ? { color: 'lightgray' } : { cursor: 'pointer' }} onClick={handleSiguiente}>Siguiente</div>
                </div>

              </div>
              :
              <div>{`${apiRef.current} not available`}</div>


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

      </div>




    </Modal>
  )
}
