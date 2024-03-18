import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/superAdmin`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiListAllCustomerKeywordLimit = (data) => {
    return axios.post(`${api}/listAllCustomerKeywordLimit`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdateCustomerKeywordLimit = (data) => {
    return axios.post(`${api}/updateCustomerKeywordLimit`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiListModuleForEstimate = () => {
    return axios.get(`${api}/listModuleForEstimate`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdateModuleForEstimate = (data) => {
    return axios.post(`${api}/updateModuleForEstimate`,data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiListAllCustomerKeywordLimit,ApiUpdateCustomerKeywordLimit,ApiListModuleForEstimate,ApiUpdateModuleForEstimate}
