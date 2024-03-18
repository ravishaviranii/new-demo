import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`
const otherApi = `${process.env.REACT_APP_API_BASE}/api`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiList = (data) => {
    return axios.post(`${api}/utility/list`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiCreate = (data) => {
    return axios.post(`${api}/utility/createUtility`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiActiveCustomer = () => {
    return axios.get(`${api}/superAdmin/listAllActiveCustomer`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiCustomerList = (data) => {
    return axios.post(`${api}/superAdmin/listAllCustomerWithoutPagination`,data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiTypeList = () => {
    return axios.get(`${api}/cronJob/getAllCronJobWithoutPagination`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiVendorList = () => {
    let data = { search: "" }
    return axios.post(`${otherApi}/superAdmin/listAllCustomerWithoutPagination`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
export { ApiActiveCustomer,ApiList, ApiCustomerList, ApiTypeList, ApiVendorList, ApiCreate }
