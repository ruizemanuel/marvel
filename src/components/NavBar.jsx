import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function NavBar() {
    const [showInput, setShowInput] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    const handleClickSearch = () => {
        navigate('/search')
    }

    const handleClickDots = (e) => {
        e.preventDefault()
        setShowNav(!showNav)

    }

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

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

                        <NavLink to='/marvel'>
                            <img src={isHovered ? require('../images/marvel2.png') : require('../images/marvel.png')}
                            className='logo'
                            alt='logo'
                            onMouseEnter={handleHover}
                            onMouseLeave={handleLeave} ></img>
                            
                        </NavLink>

                    </div>

                    <div className='busqueda-container'>
                        <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} onClick={handleClickSearch}></FontAwesomeIcon>
                    </div>

                    <div className='navegacion-lg'>
                        <NavLink className={({ isActive }) => (isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/marvel'>HOME</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/characters'>CHARACTERS</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/comics'>COMICS</NavLink>
                        <div className='d-flex align-items-center'>
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
                        <NavLink className={({ isActive }) => (isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/marvel'>HOME</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/characters'>CHARACTERS</NavLink>
                        <NavLink className={({ isActive }) => (isActive ? 'active-style-navegacion' : 'inactive-style-navegacion')} to='/comics'>COMICS</NavLink>
                    </div>
                    :
                    null
                }

            </div>

        </header>
    )
}
