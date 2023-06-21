import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Item from '../components/Item'
import PageNumbers from '../components/PageNumbers'

export default function Comics() {

  const [comics, setComics] = useState([])
  const [searchedComics, setSearchedComics] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [paginas, setPaginas] = useState([]);
  const [numeroPages, setNumeroPages] = useState([]);

  const itemsPerPage = 6

  useEffect(() => {
    const newPaginas = [];
    for (let i = 1; i <= Math.ceil(comics.length / itemsPerPage); i++) {
      newPaginas.push(i);
    }
    setPaginas(newPaginas);
    setNumeroPages(newPaginas.slice(0,7))
  }, [comics]);

  const APIKEY = process.env.REACT_APP_API_APIKEY
  const HASH = process.env.REACT_APP_API_HASH

  const getComics = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`https://gateway.marvel.com/v1/public/comics?limit=60&ts=1&apikey=${APIKEY}&hash=${HASH}`).then(result => result.json())
      const onlyComics = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
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
            {numeroPages.map((num, index) => {
              return <PageNumbers key={index}
                num={num}
                paginas={paginas}
                numeroPages={numeroPages}
                setNumeroPages={setNumeroPages}
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
