/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthProvider';
import './Profile.css';

export const Profile = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div class="profile-card text-center shadow bg-light p-4 my-5 rounded-3">
            <div class="profile-photo shadow">
                <img src={require('../../Assets/Images/User/User-avatar.png')} alt="profile" class="avatar" />
            </div>
            <h3 class="pt-3 text-dark">{auth?.name}</h3>
            Email: <p class="text-secondary">{auth?.email}</p>
            Address: <p class="text-secondary">{auth?.address}</p>
            Phone Number: <p class="text-secondary">{auth?.phoneNumber}</p>
            <div class="social-links">
                <ul>
                    <li><a href="#"><i class="bi bi-facebook"></i></a></li>
                    <li><a href="#"><i class="bi bi-twitter"></i></a></li>
                    <li><a href="#"><i class="bi bi-instagram"></i></a></li>
                    <li><a href="#"><i class="bi bi-linkedin"></i></a></li>
                </ul>
            </div>
        </div>
    )
}
