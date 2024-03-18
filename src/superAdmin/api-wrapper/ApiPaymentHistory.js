import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/paymentHistory`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiGetPaymentHistory = (data) => {
    return axios.post(`${api}/getPaymentHistory`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


export { ApiGetPaymentHistory }
