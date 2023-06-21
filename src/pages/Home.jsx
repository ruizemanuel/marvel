import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate()

    const handleClickComics = () => {
        navigate('/comics')
    }

    const handleClickCharacters = () => {
        navigate('/characters')
    }

    return (
        <>
            <div className='box-container' onClick={handleClickComics}>
                <div className='title-box'>
                    <div className='title'>COMICS</div>
                    <div className='d-flex'>
                        <div style={{ backgroundColor: '#ed1d24' }} className='barra'></div>
                        <div style={{ backgroundColor: '#b91e23' }} className='barra'></div>
                        <div style={{ backgroundColor: '#851d21' }} className='barra'></div>
                    </div>
                </div>
                <img className='img-home' src={require('../images/comics-dummy.jpg')} alt="comics" />

            </div>

            <div className='box-container' onClick={handleClickCharacters}>
                <div className='title-box'>
                    <div className='d-flex ps-3'>
                        <div style={{ backgroundColor: '#ed1d24' }} className='barra'></div>
                        <div style={{ backgroundColor: '#b91e23' }} className='barra'></div>
                        <div style={{ backgroundColor: '#851d21' }} className='barra'></div>
                    </div>
                    <div className='title pe-2'>CHARACTERS</div>

                </div>
                <img className='img-home' src={require('../images/characters-dummy.jpg')} alt="comics" />

            </div>


        </>
    )
}
