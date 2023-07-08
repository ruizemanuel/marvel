import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error404() {
    let num = Math.floor(Math.random() * 3) + 1;
    if (num === 4) {
        num = 3;
    }
    return (
        <div style={{marginTop: '100px'}} className='d-flex flex-column flex-lg-row align-items-center justify-content-around'>
            <div>
                <div style={{ fontSize: '48px' }}>404 page not found</div>
                <div style={{ fontSize: '34px' }}>hydra has stolen this page from the S.H.I.E.L.D. database!</div>
                <NavLink className='btn-error' to='/marvel'>go to home</NavLink>
            </div>

            <img src={require(`../images/error404-${num}.jpg`)} alt="error404" />
        </div>

    )
}
