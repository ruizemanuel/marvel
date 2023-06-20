import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row, Spinner } from 'react-bootstrap'
import Item from '../components/Item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import PageNumbers from '../components/PageNumbers'

export default function Comics() {

  const [comics, setComics] = useState([])
  const [searchedComics, setSearchedComics] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const itemsPerPage = 6
  const paginas = []
  for (let i = 1; i <= Math.ceil(comics.length / itemsPerPage); i++) {
    paginas.push(i)
  }

  const URL_COMICS = process.env.REACT_APP_API_COMICS_MARVEL

  const getComics = async () => {
    //console.log('URL', URL_COMICS)
    try {
      setIsLoading(true)
      const res = await fetch(URL_COMICS).then(result => result.json())

      console.log('RESULTADO SIN FILTRO', res.data.results)
      const onlyComics = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      console.log('RESULTADO', onlyComics)
      setComics(onlyComics)
      setSearchedComics(onlyComics.slice(0, 6))
    } catch (e) {
      console.log('error', e)
    }
    finally {
      setIsLoading(false)
    }

  }


  useEffect(() => {
    getComics()
  }, [])

  return (
    <>

      {!isLoading ?

        <>
          <Container className='mt-5'>
            <Row>
              {
                searchedComics.map((comic) => {
                  return <Col xs={12} sm={6} lg={4} xl={3} 
                  key={comic.id} 
                  style={{ cursor: 'pointer' }} 
                  className='d-flex justify-content-center scale-in-animation'>
                    <Item item={comic}
                      backgroundColor={'#ed1d24'}
                      colorBarra={'#1e1e1e'}
                      colorBarra3={'#d81d23'}
                      colorBarra4={'#b91e23'}
                      colorBarra5={'#851d21'}
                      colorBarra6={'#511d1f'}
                    ></Item>
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
        :
        <div className='spinner'>
          <Spinner animation="border" variant="danger" />
          <div className='ms-3'>Cargando...</div>
        </div>
      }

    </>
  )
}
