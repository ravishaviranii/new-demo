import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/support`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiList = (data) => {
    return axios.post(`${api}/listAllTickets`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiReplyMsg = (data, id) => {
    return axios.post(`${api}/replyTicket/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiView = (id) => {
    return axios.get(`${api}/viewTicket/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}


const ApiCloseTicket = (data, id) => {
    return axios.post(`${api}/closeTicket/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiList, ApiReplyMsg, ApiView, ApiCloseTicket }

