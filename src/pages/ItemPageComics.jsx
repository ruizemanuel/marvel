import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMarvel } from '../MarvelContext';

export default function ItemPageComics() {

  const comics = JSON.parse(localStorage.getItem('comics'));   
  const {id} = useParams()

  const item = comics.find((comic) => Number(comic.id) === Number(id))

  const [itemsToShow, setItemsToShow] = useState(item.characters.items.slice(0, 4))
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4
  const ultimaPagina = Math.ceil(item.characters.items.length / itemsPerPage)
  

  const handleSiguiente = () => {
    if (currentPage !== ultimaPagina) {
      const pagina = currentPage + 1
      const ultimoItem = pagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setItemsToShow(item.characters.items.slice(primerItem, ultimoItem))
      setCurrentPage(pagina)
    }



  }

  const handleAnterior = () => {
    if (currentPage !== 1) {
      const pagina = currentPage - 1
      const ultimoItem = pagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setItemsToShow(item.characters.items.slice(primerItem, ultimoItem))
      setCurrentPage(pagina)
    }

  }

  return (
    <div className='px-3 py-4'>


      <div className='d-flex justify-content-center' style={{ border: '1px solid #1e1e1e'}}>
        <img className='img-modal' src={`${item.thumbnail.path + '.' + item.thumbnail.extension}`} alt="item" />
      </div>
      <div className='body-container-page'>
        
          <div>
            <div className='title-page' >{item.title}</div>
          </div>
        

        <div className='description-page'>{item.description ? item.description : 'Description not available'}</div>
        <div className='lista-items-modal'>

          {

            item.characters.available !== 0 ?

              <div>
                <div className='mt-2'>characters:</div>
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
              <div>characters not available</div>


          }


        </div>

      </div>




    </div>
  )
}
