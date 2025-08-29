import React from 'react'
import './Footer.css'
import Logo from '../../assets/treelogo.png'

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-content">
                <img src={Logo} alt="familyroots logo" className='footer-logo' />
                <p className='footer-text'>
                    Connect generations, preserve memories, and manage your family
                    history beautifully in one place.
                </p>
            </div>
            <p className="copyright">Copyright &copy; {new Date().getFullYear()} FamilyRoots. All Rights Reserved</p>
        </section>
    )
}

export default Footer
