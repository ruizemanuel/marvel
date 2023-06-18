import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

export default function PageNumbers({ num, paginas, setSearchedItems, items, itemsPerPage, currentPage, setCurrentPage }) {

    

    const handleClickPage = (e) => {
        const ultimoItem = Number(e.target.id) * itemsPerPage
        const primerItem = ultimoItem - itemsPerPage
        setSearchedItems(items.slice(primerItem, ultimoItem))
        setCurrentPage(Number(e.target.id))
    }

    const handleClickArrow = (e, currentPage) => {
        if (currentPage !== paginas.length) {
            const numPagina = currentPage + 1
            const ultimoItem = numPagina * itemsPerPage
            const primerItem = ultimoItem - itemsPerPage
            setSearchedItems(items.slice(primerItem, ultimoItem))
            setCurrentPage(numPagina)
        }

    }

    return (
        <div className='d-flex align-items-center'>

            <div style={currentPage === num ?
                { fontSize: '22px', cursor: 'pointer', backgroundColor: '#ed1d24', color: 'white' }
                :
                { fontSize: '22px', cursor: 'pointer' }}
                className='px-2'
                id={num}
                onClick={(e) => handleClickPage(e)}>{num}</div>

            {paginas.length === num ?

                <FontAwesomeIcon style={currentPage !== paginas.length ?
                    { fontSize: '22px', color: 'black', cursor: 'pointer', marginLeft: '2px' }
                    :
                    { fontSize: '22px', color: 'lightgray', marginLeft: '2px' }
                }
                    icon={faArrowRight}
                    onClick={(e) => handleClickArrow(e, currentPage)}></FontAwesomeIcon>
                :
                <div style={{
                    height: '5px',
                    width: '5px',
                    marginLeft: '2px',
                    marginRight: '2px',
                    borderRadius: '10px',
                    backgroundColor: 'black',
                }}></div>
            }



        </div>
    )
}
