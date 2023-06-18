import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import ComicItem from '../components/ComicItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageNumbers from '../components/PageNumbers'

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
        {paginas.map((num, index) => {
          return <PageNumbers key={index} 
          num={num} 
          paginas={paginas} 
          setSearchedItems={setSearchedComics} 
          items={comics} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
        })}
      </div>

    </>
  )
}
