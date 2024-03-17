/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useRef, useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'Context/AuthProvider';
import CartContext from 'Context/CartProvider';
import { getUserInformation } from 'Services/userService';

export const NavBar = () => {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);
    const initialized = useRef(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getUserInformation();
                if (res.status === 200) {
                    const dataLogin = {
                        isAuthenticated: true,
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        address: res.data.address,
                        phoneNumber: res.data.phoneNumber,
                    }
                    setAuth(dataLogin);
                }
                else {
                    setAuth({isAuthenticated: false});
                }
            } catch (error) {
            }
        }
        if (!initialized.current) {
            initialized.current = true;
            fetchData();
        }
    }, [auth, setAuth]);

    useEffect(() => {
        const cartStorage = localStorage.getItem('cart-storage');
        let numberOfProduct = 0;
        if (cartStorage) {
            numberOfProduct = JSON.parse(cartStorage).length;
        }
        setCart({ numberOfProduct: numberOfProduct });
    }, []);

    const handleSearch = () => {
        if (searchText) {
            navigate(`/?search=${encodeURIComponent(searchText)}`);
        } else {
            navigate('/');
        }
    };

    const handlePressEnter = (event) => {
        if (event.code === "Enter") {
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
                    <Link to={'/'}><img src={require('Assets/Images/Logo/CartLogo.png')} alt="Logo" className="img-fluid" /></Link>
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
                    <div className="d-flex">
                        <div className="input-group">
                            <input className="form-control" type="search" placeholder="Search"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(event) => handlePressEnter(event)} />
                            <div className="input-group-text cursor-pointer" onClick={handleSearch}>
                              <i className="bi bi-search"></i>
                            </div>
                        </div>
                    </div>
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
                                    <Link to="/my-order" className='align-self-center'>
                                        <span className='text-white'>My order</span>
                                    </Link>
                                    <Link to="/profile" className='align-self-center ms-3 px-4'>
                                        <span className='text-white'>Hi, <br></br>{auth.name}</span>
                                    </Link>
                                    <Link to="/cart" className='align-self-center mx-3'>
                                        <span className='text-white'><i className="bi bi-cart"></i> (<b>{cart.numberOfProduct}</b>)</span>
                                    </Link>
                                    <button className="btn btn-sm btn-light ms-3" onClick={handleSignout}>
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
