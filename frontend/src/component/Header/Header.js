import React from 'react'
import Logo from './../../assets/image.png'
import './Header.css'
const Header = () => {
    return (
        <div className='header'>
            <div className='header-title'>
                <img src={Logo} alt="FamilyRoots logo" aria-label='logo' />
                <p>FamilyRoots</p>
            </div>
            <span>Family Tree Management System</span>
        </div>
    )
}

export default Header
