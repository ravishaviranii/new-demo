import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/support`
const otherApi = `${process.env.REACT_APP_API_BASE}/api`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiCategoryList = () => {
    return axios.get(`${otherApi}/supportCategory/categoryWithoutPagination`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiCreate = (data) => {
    return axios.post(`${api}/vendorCreateTicket`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiList = (data) => {
    return axios.post(`${api}/vendorAllTickets`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiView = (id) => {
    return axios.get(`${api}/vendorViewTicket/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiSendMsg = (data, id) => {
    return axios.post(`${api}/vendorReplyTicket/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
// const ApistatusChange = (data, id) => {
//     return axios.post(`${api}/changeStatus/${id}`, data, { headers })
//         .then(res => res.data).catch(res => res.data)
// }

export { ApiCategoryList, ApiCreate, ApiList, ApiView, ApiSendMsg }

