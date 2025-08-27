import React, { useEffect } from 'react'
import Logo from './../../assets/image.png'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const logout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
        setTimeout(() => {
            navigate('/login')
        }, 1500);

    }

    useEffect(() => {
        const checkLogin = () => {
            if (!token) {
                navigate("/login");
            }
        }
        checkLogin();
    }, [token, navigate]);

    return (
        <header className='header'>
            <div className='header-logo'>
                <div className='header-title'>
                    <img src={Logo} alt="FamilyRoots logo" aria-label='logo' />
                    <p>FamilyRoots</p>
                </div>
                <p className='header-text'> <span className='family-text'>Family</span> Tree Management System</p>
            </div>
            <div className='header-button'>
                {token ? <button className='logout-button' onClick={logout}>Logout</button> : <button className='login-button' onClick={() => navigate('/login')}>Login</button>}
            </div>
        </header>
    )
}

export default Header
