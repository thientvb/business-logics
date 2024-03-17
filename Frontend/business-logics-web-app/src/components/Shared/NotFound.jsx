import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="wrapper">
        <h1>404!</h1>
        <h5>Sorry, Page not found</h5>
        <p>Which page you are looking for might have been removed had its name changed or is tempoarial unaviable</p>
        <div className="buttons">
          <Link to={'/'}><i className="bi bi-home"></i> Go to Home</Link>
          <Link to={'/'}><i className="bi bi-envelope"></i> Contact Us</Link>
        </div>
        <div className="search-box">
          <input type="text" name="search" placeholder="Search" />
            <button type="search"><i className="bi bi-search"></i> Search</button>
        </div>
      </div>
    </div>
  )
}
