import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import ComicItem from '../components/ComicItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function Comics() {

  const [comics, setComics] = useState([])
  const [searchedComics, setSearchedComics] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6
  const paginas = []
  for (let i = 1; i <= Math.ceil(comics.length / itemsPerPage); i++) {
    paginas.push(i)
  }

  const URL_COMICS = process.env.REACT_APP_API_COMICS_MARVEL

  const getComics = async () => {
    //console.log('URL', URL_COMICS)
    try {
      const res = await fetch(URL_COMICS).then(result => result.json())

      console.log('RESULTADO SIN FILTRO', res.data.results)
      const onlyComics = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      console.log('RESULTADO', onlyComics)
      setComics(onlyComics)
      setSearchedComics(onlyComics.slice(0, 6))
    } catch (e) {
      console.log('error', e)
    }

  }

  const handleClickPage = (e) => {
    const ultimoItem = Number(e.target.id) * itemsPerPage
    const primerItem = ultimoItem - itemsPerPage
    setSearchedComics(comics.slice(primerItem, ultimoItem))
    setCurrentPage(Number(e.target.id))
  }

  const handleClickArrow = (e, currentPage) => {
    if (currentPage !== paginas.length) {
      const numPagina = currentPage + 1
      const ultimoItem = numPagina * itemsPerPage
      const primerItem = ultimoItem - itemsPerPage
      setSearchedComics(comics.slice(primerItem, ultimoItem))
      setCurrentPage(numPagina)
    }

  }




  const renderPageNumbers = paginas.map((num, index) => {
    return <div key={index} className='d-flex align-items-center'>

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

  })

  useEffect(() => {
    getComics()
  }, [])

  return (
    <>

      <Container className='mt-5'>
        <Row>
          {
            searchedComics.map((comic) => {
              return <Col key={comic.id} className='d-flex justify-content-center'>
                <ComicItem comic={comic}></ComicItem>
              </Col>
            })
          }
        </Row>
      </Container>
      <div className='d-flex justify-content-center mb-4'>
        {renderPageNumbers}
      </div>

    </>
  )
}
