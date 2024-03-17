/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import AuthContext from 'Context/AuthProvider';
import './Profile.css';

export const Profile = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="profile-card text-center shadow bg-light p-4 my-5 rounded-3">
            <div className="profile-photo shadow">
                <img src={require('Assets/Images/User/User-avatar.png')} alt="profile" className="avatar" />
            </div>
            <h3 className="pt-3 text-dark">{auth?.name}</h3>
            Email: <p className="text-secondary">{auth?.email}</p>
            Address: <p className="text-secondary">{auth?.address}</p>
            Phone Number: <p className="text-secondary">{auth?.phoneNumber}</p>
            <div className="social-links">
                <ul>
                    <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                    <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                    <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                    <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    )
}
