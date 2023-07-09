import React, { useRef, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Item from '../components/Item';
import { useMarvel } from '../MarvelContext';

export default function SearchPage() {

    const wordRef = useRef(null);
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRadio, setSelectedRadio] = useState('');
    const [searchParameter, setSearchParameter] = useState('');
    const [error, setError] = useState(false)

    const { setHistorietas, setPersonajes } = useMarvel()

    const handleChange = (e) => {
        wordRef.current.value = e.target.value
    }

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
        if (e.target.value === 'comics') {
            setSearchParameter('titleStartsWith')
        } else {
            setSearchParameter('nameStartsWith')
        }

    };

    const APIKEY = process.env.REACT_APP_API_APIKEY
    const HASH = process.env.REACT_APP_API_HASH

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedRadio && wordRef.current.value) {
            try {
                setError(false)
                setIsLoading(true)
                const res = await fetch(`https://gateway.marvel.com/v1/public/${selectedRadio}?limit=20&ts=1&apikey=${APIKEY}&hash=${HASH}&${searchParameter}=${wordRef.current.value}`).then(result => result.json())
                if (selectedRadio === 'comics') {
                    setHistorietas(res.data.results)
                } else if (selectedRadio === 'characters') {
                    setPersonajes(res.data.results)
                }

                setItems(res.data.results)
            } catch (e) {
                console.log('error', e)
            }
            finally {
                setIsLoading(false)
            }
        } else {
            setError(true)
        }
    }

    const ErrorMessage = () => {
        return <div className='error-msg'>
            <h2>ERROR!</h2>
            <p>Comics or Characters must be selected and the search input can't be empty</p>
        </div>
    }

    return (

        <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
            <form className='search-form' onSubmit={(e) => handleSubmit(e)}>
                <div style={{ margin: '0 auto' }} className='d-flex flex-column justify-content-center'>
                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="comics"
                            checked={selectedRadio === 'comics'}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label" for="flexRadioDefault1">
                            comics
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="characters"
                            checked={selectedRadio === 'characters'}
                            onChange={handleRadioChange} />
                        <label className="form-check-label" for="flexRadioDefault2">
                            characters
                        </label>
                    </div>
                </div>


                <div className='searchBox'>
                    <div className="searchInputBox">
                        <input
                            ref={wordRef}
                            type="text"
                            placeholder='Spider-Man'
                            handleChange={e => handleChange(e)}
                        />

                    </div>


                    <button type='submit' className="btn-buscar">
                        Buscar
                    </button>

                </div>


            </form>

            {error ?
                <ErrorMessage />
                :
                null

            }

            {!isLoading ?

                <Container className='mt-5 mb-5'>
                    <Row>
                        {
                            items.map((element) => {
                                return <Col xs={12} sm={6} lg={4} xl={3}
                                    key={element.id}
                                    style={{ cursor: 'pointer' }}
                                    className='d-flex justify-content-center fade-in-animation'>
                                    {selectedRadio === 'comics' ?

                                        <Item item={element}
                                            backgroundColor={'#ed1d24'}
                                            colorBarra={'#1e1e1e'}
                                            colorBarra3={'#d81d23'}
                                            colorBarra4={'#b91e23'}
                                            colorBarra5={'#851d21'}
                                            colorBarra6={'#511d1f'}
                                        ></Item>
                                        :
                                        <Item item={element}
                                            backgroundColor={'#1e1e1e'}
                                            colorBarra={'#ed1d24'}
                                            colorBarra3={'#331e1f'}
                                            colorBarra4={'#521d1f'}
                                            colorBarra5={'#851d21'}
                                            colorBarra6={'#b91d22'}></Item>
                                    }

                                </Col>
                            })
                        }
                    </Row>
                </Container>
                :
                <div className='spinner'>
                    <Spinner animation="border" variant="danger" />
                    <div className='ms-3'>Cargando...</div>
                </div>
            }
        </div>


    )
}
