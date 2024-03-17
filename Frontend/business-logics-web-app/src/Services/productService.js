import axios from "api/axios";

const getProducts = (searchText, skip, take) => {
    return axios.get(`/api/Product?searchText=${searchText}&skip=${skip}&take=${take}`);
}

const getProduct = (id) => {
    return axios.get(`/api/Product/${id}`);
}

export {
    getProducts,
    getProduct
}