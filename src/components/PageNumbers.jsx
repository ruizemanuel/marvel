import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function PageNumbers({ num, paginas, numeroPages, setNumeroPages, currentPage, setCurrentPage, setOffset }) {

    const handleClickPage = (e) => {
        setOffset((Number(e.target.id) - 1) * 100)
        setCurrentPage(Number(e.target.id))
    }

    const handleClickArrow = (e, currentPage) => {
        if (currentPage !== paginas.length) {
            const numPagina = currentPage + 1
            setOffset((numPagina - 1) * 100)
            setCurrentPage(numPagina)
            
        }

        if (currentPage >= numeroPages.length) {
            const ultimoItem = currentPage + 1
            const primerItem = ultimoItem - 7
            setNumeroPages(paginas.slice(primerItem, ultimoItem))
        }

    }

    const handleClickArrowLeft = (e, currentPage) => {
        if (currentPage <= paginas.length) {
            const numPagina = currentPage - 1
            setOffset((numPagina - 1) * 100)
            setCurrentPage(numPagina)
        }

        if (currentPage <= numeroPages[0]) {
            const ultimoItem = numeroPages[numeroPages.length - 1] - 1
            const primerItem = ultimoItem - 7
            setNumeroPages(paginas.slice(primerItem, ultimoItem))
        }

    }


    return (

        <div className='d-flex align-items-center'>

            {num === numeroPages[0] && numeroPages[0] !== 1 ?

                <FontAwesomeIcon style={{ fontSize: '22px', color: 'black', cursor: 'pointer', marginRight: '5px' }}
                    icon={faArrowLeft}
                    onClick={(e) => handleClickArrowLeft(e, currentPage)}></FontAwesomeIcon>
                :
                null
            }

            <div style={currentPage === num ?
                { fontSize: '22px', cursor: 'pointer', backgroundColor: '#ed1d24', color: 'white' }
                :
                { fontSize: '22px', cursor: 'pointer' }}
                className='px-2'
                id={num}
                onClick={(e) => handleClickPage(e)}>{num}</div>

            {num === numeroPages[numeroPages.length - 1] ?

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
