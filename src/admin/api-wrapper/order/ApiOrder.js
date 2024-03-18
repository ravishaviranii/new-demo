import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/seller/orders/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const ApiOrderList = (data) => {
    return axios.post(`${api}getOrdersFromDB`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiGetOrderDetails = (id) => {
    return axios.get(`${api}getOrderFromDB/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiOrderList, ApiGetOrderDetails }
