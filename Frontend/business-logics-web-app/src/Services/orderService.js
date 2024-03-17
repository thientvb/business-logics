import axios from "api/axios";

const createOrder = (data) => {
    return axios.post(`/api/Order`, data);
}

const getOrder = (id) => {
    return axios.get(`/api/Order/${id}`);
}

const getOrders = (skip, take) => {
    return axios.get(`/api/Order?skip=${skip}&take=${take}`);
}

export {
    createOrder,
    getOrder,
    getOrders
}