import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

export default function ComicModal({ show, setShow, comic, title }) {
  const [charactersToShow, setCharactersToShow] = useState(comic.characters.items.slice(0, 4))
  console.log('PERSONAJE', comic.characters.items.slice(0, 4))
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4
  const ultimaPagina = Math.ceil(comic.characters.items.length / itemsPerPage)
  const handleClose = () => setShow(false)

  // useEffect(() => {
  //     setCharactersToShow([...])
  // }, [])

  const handleSiguiente = () => {
    if (currentPage !== ultimaPagina) {
      const pagina = currentPage + 1
      const ultimoItem = pagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setCharactersToShow(comic.characters.items.slice(primerItem, ultimoItem))
      setCurrentPage(pagina)
    }



  }

  const handleAnterior = () => {
    if (currentPage !== 1) {
      const pagina = currentPage - 1
      const ultimoItem = pagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setCharactersToShow(comic.characters.items.slice(primerItem, ultimoItem))
      setCurrentPage(pagina)
    }

  }

  return (
    <Modal show={show} onHide={handleClose} animation={false} className='px-3 py-4'>


      <div style={{ border: '1px solid #1e1e1e', position: 'relative' }}>
        <img className='img-modal' src={`${comic.thumbnail.path + '.' + comic.thumbnail.extension}`} alt="item" />
        <img className='close-icon-modal' src={require('../images/close-icon.png')} alt="close-icon" onClick={handleClose} />
      </div>
      <div className='body-container-modal'>
        <div className='d-flex justify-content-between' >
          <div className='title-modal text-truncate' >{title}</div>
          <div className='title-modal'>{`N#${comic.issueNumber}`}</div>
        </div>
        <div className='description-modal'>{comic.description ? comic.description : 'Description not available'}</div>
        <div className='lista-personajes-modal'>

          {
            comic.characters.available !== 0 ?

              <div>
                <div className='mt-2'>Characters:</div>
                <ul>
                  {charactersToShow.map((character, index) => {
                    return <li key={index}>
                      {character.name}
                    </li>
                  })}
                </ul>
                <div className='d-flex justify-content-center'>
                  <div style={currentPage === 1 ? { color: 'lightgray' } : { cursor: 'pointer' }} className='me-3' onClick={handleAnterior}>Anterior</div>
                  <div style={currentPage === ultimaPagina ? { color: 'lightgray' } : { cursor: 'pointer' }} onClick={handleSiguiente}>Siguiente</div>
                </div>

              </div>
              :
              <div>Characters not available</div>
          }


        </div>

      </div>




    </Modal>
  )
}
