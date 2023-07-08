import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Item from '../components/Item'
import PageNumbers from '../components/PageNumbers'

export default function Characters() {

  const [characters, setCharacters] = useState([])
  const [cuttedCharacters, setCuttedCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [paginas, setPaginas] = useState([]);
  const [numeroPages, setNumeroPages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(null)


  useEffect(() => {
    const newPaginas = [];
    for (let i = 1; i <= Math.ceil(totalCharacters / characters.length); i++) {
      newPaginas.push(i);
    }
    setPaginas(newPaginas);
    setNumeroPages(newPaginas.slice(0, 7))
  }, [totalCharacters]);


  const APIKEY = process.env.REACT_APP_API_APIKEY
  const HASH = process.env.REACT_APP_API_HASH

  const getCharacters = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`https://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=${APIKEY}&hash=${HASH}&offset=${offset}`).then(result => result.json())
      localStorage.setItem('characters', JSON.stringify(res.data.results));
      setCharacters(res.data.results)
      setCuttedCharacters(res.data.results.slice(0, 10))
      setTotalCharacters(res.data.total)
    } catch (e) {
      console.log('error', e)
    }
    finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    getCharacters()
  }, [offset])

  const loadMore = () => {
    setCuttedCharacters(characters.slice(0, cuttedCharacters.length + 10))
  }

  return (
    <>

      {!isLoading ?
        <>
          <Container className='mt-5'>
            <Row>
              {
                cuttedCharacters.map((character) => {
                  return <Col xs={12} sm={6} lg={4} xl={3}
                    key={character.id}
                    style={{ cursor: 'pointer' }}
                    className='d-flex justify-content-center fade-in-animation'>
                    <Item item={character}
                      backgroundColor={'#1e1e1e'}
                      colorBarra={'#ed1d24'}
                      colorBarra3={'#331e1f'}
                      colorBarra4={'#521d1f'}
                      colorBarra5={'#851d21'}
                      colorBarra6={'#b91d22'}></Item>
                  </Col>
                })
              }
            </Row>
          </Container>
          {cuttedCharacters.length < characters.length ?
            <div className='d-flex justify-content-center mt-4'>
              <div className="btn-load-more" onClick={loadMore}>
                LOAD MORE
              </div>
            </div>
            :
            null
          }


          <div className='d-flex justify-content-center mb-4'>
            {numeroPages.map((num, index) => {
              return <PageNumbers key={index}
                num={num}
                paginas={paginas}
                numeroPages={numeroPages}
                setNumeroPages={setNumeroPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setOffset={setOffset} />
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
