/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useRef, useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthProvider';
import { getUserInformation } from 'Services/userService';

export const NavBar = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const initialized = useRef(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getUserInformation();
                if (res.data) {
                    const dataLogin = {
                        isAuthenticated: true,
                        name: res.data.name,
                        email: res.data.email,
                        address: res.data.address,
                        phoneNumber: res.data.phoneNumber,
                    }
                    setAuth(dataLogin);
                }
            } catch (error) {
                setAuth({isAuthenticated: false});
            }
        }
        if (!initialized.current) {
            initialized.current = true;
            fetchData();
        }
    }, [auth, setAuth]);

    const handleSearch = () => {
        if (searchText) {
            navigate(`/?search=${encodeURIComponent(searchText)}`);
        } else {
            navigate('/');
        }
    };

    const handlePressEnter = (event) => {
        if (event.charCode === 13) {
            handleSearch();
        }
      }

    const handleSignout = () => {
        setAuth({isAuthenticated: false});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link to={'/'}><img src={require('../../Assets/Images/Logo/CartLogo.png')} alt="Logo" className="img-fluid" /></Link>
                    <div className="dropdown text-white mx-3">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a className="dropdown-item" href="#">All</a></li>
                            <li><a className="dropdown-item" href="#">Table</a></li>
                            <li><a className="dropdown-item" href="#">Chair</a></li>
                            <li><a className="dropdown-item" href="#">Door</a></li>
                        </ul>
                    </div>
                    <form className="d-flex" role="search">
                        <div className="input-group">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" 
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyUp={(event) => handlePressEnter(event)} />
                            <div className="input-group-text cursor-pointer">
                              <i className="bi bi-search" onClick={handleSearch}></i>
                            </div>
                        </div>
                    </form>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="#">Contact Us</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {auth && !auth.isAuthenticated && (
                                <>
                                    <Link to="/registration">
                                        <button className="btn btn-danger ms-3">Signup Now</button>
                                    </Link>
                                    <Link to="/login">
                                        <button className="btn btn-light ms-3">Login</button>
                                    </Link>
                                </>
                            )}
                            {auth && auth.isAuthenticated && (
                                <>
                                    <Link to="/order" className='align-self-center'>
                                        <span className='text-white'>My order</span>
                                    </Link>
                                    <Link to="/profile" className='align-self-center'>
                                        <span className='text-white'>Hi, <br></br>{auth.name}</span>
                                    </Link>
                                    <Link to="/cart" className='align-self-center'>
                                        <span className='text-white mx-3'><i className="bi bi-cart"></i> (0)</span>
                                    </Link>
                                    <button className="btn btn-light ms-3" onClick={handleSignout}>
                                        SignOut
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}
