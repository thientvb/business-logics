import axios from "api/axios";

const registerNewUser = (name, email, phoneNumber, address, password, confirmPassword) => {
    return axios.post('/api/Account/register', {
        name, email, phoneNumber, address, password, confirmPassword
    });
}

const loginUser = (email, password) => {
    return axios.post('/api/Account/login', {
        email, password
    });
}

const getUserInformation = () => {
    return axios.get('/api/User');
}

export {
    registerNewUser,
    loginUser,
    getUserInformation
}