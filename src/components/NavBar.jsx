import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useMarvel } from '../MarvelContext'

export default function NavBar() {
    const [showInput, setShowInput] = useState(false)
    const [showNav, setShowNav] = useState(false)

    const handleClickSearch = () => {
        setShowInput(!showInput)
    }

    const handleClickDots = (e) => {
        e.preventDefault()
        console.log('DOTS EN METODO', showNav)
        setShowNav(!showNav)

    }

    return (
        <header>
            <div className='d-flex flex-column'>
                <div className='header'>
                    <div className='d-flex align-items-center'>
                        <div className='dot-container' onClick={(e) => handleClickDots(e)}>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                        </div>
                        <NavLink to='/'>
                            <img className='logo' src={require('../images/marvel.png')} alt='logo'></img>
                        </NavLink>

                    </div>

                    <div className='busqueda-container'>
                        {
                            showInput ? <SearchBar /> : null
                        }

                        <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} onClick={handleClickSearch}></FontAwesomeIcon>
                    </div>

                    <div className='navegacion-lg'>
                        <NavLink className={({ isActive }) => ( isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/'>HOME</NavLink>
                        <NavLink className={({ isActive }) => ( isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/characters'>CHARACTERS</NavLink>
                        <NavLink className={({ isActive }) => ( isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/comics'>COMICS</NavLink>
                        <div className='d-flex align-items-center'>
                            {
                                showInput ? <SearchBar /> : null
                            }

                            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} onClick={handleClickSearch}></FontAwesomeIcon>
                        </div>

                    </div>

                </div>
                {showNav ?
                    <div className='navegacion'>
                        <div className='barras-container-navbar'>
                            <div style={{ backgroundColor: '#ed1d24' }} className='barra-item-navbar'></div>
                            <div style={{ backgroundColor: '#ba1e23' }} className='barra-item-navbar'></div>
                            <div style={{ backgroundColor: '#861e22' }} className='barra-item-navbar'></div>
                        </div>
                        <NavLink className={({ isActive }) => ( isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/'>HOME</NavLink>
                        <NavLink className={({ isActive }) => ( isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/characters'>CHARACTERS</NavLink>
                        <NavLink className={({ isActive }) => ( isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/comics'>COMICS</NavLink>
                    </div>
                    :
                    null
                }

            </div>

        </header>
    )
}
