import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/product/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const ApiCreateProduct = (data) => {
    return axios.post(`${api}createProduct`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiProductListingFromDB = (data) => {
    return axios.post(`${api}listProductFromDB`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdateProduct = (id, data) => {
    return axios.post(`${api}updateProduct/${id}`, data, { headers })
        .then((res) => res.data).catch((res) => res.data)
};

const ApiProductListing = (data) => {
    return axios.post(`${api}listProduct`, data, { headers })
    .then((res) => res.data).catch((res) => res.data)
}

const ApiProductListGroupName = (data) => {
    return axios.post(`${api}listAdGroupName`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
export { ApiProductListGroupName,ApiCreateProduct, ApiUpdateProduct, ApiProductListing ,ApiProductListingFromDB}

