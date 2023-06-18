import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import Item from '../components/Item'
import PageNumbers from '../components/PageNumbers'

export default function Characters() {

  const [characters, setCharacters] = useState([])
  const [searchedCharacters, setSearchedCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6
  const paginas = []
  for (let i = 1; i <= Math.ceil(characters.length / itemsPerPage); i++) {
    paginas.push(i)
  }

  const URL_CHARACTERS = process.env.REACT_APP_API_CHARACTERS_MARVEL

  const getCharacters = async () => {
    //console.log('URL', URL_COMICS)
    try {
      const res = await fetch(URL_CHARACTERS).then(result => result.json())
      //const onlyCharacters = res.data.results.filter((comic) => Number(comic.issueNumber) > 0)
      console.log('RESULTADOSSSSS', res.data.results)
      setCharacters(res.data.results)
      setSearchedCharacters(res.data.results.slice(0, 6))
    } catch (e) {
      console.log('error', e)
    }

  }


  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <>

      <Container className='mt-5'>
        <Row>
          {
            searchedCharacters.map((character) => {
              return <Col key={character.id} className='d-flex justify-content-center'>
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
      <div className='d-flex justify-content-center mb-4'>
        {paginas.map((num, index) => {
          return <PageNumbers key={index} 
          num={num} 
          paginas={paginas} 
          setSearchedItems={setSearchedCharacters} 
          items={characters} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
        })}
      </div>

    </>
  )
}
