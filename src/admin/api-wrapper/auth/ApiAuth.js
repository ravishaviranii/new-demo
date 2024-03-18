import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/customer/`
const otherApi = `${process.env.REACT_APP_API_BASE}/api/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const apiAmazon = `${process.env.REACT_APP_API_BASE}/api/amazon/`

const ApiLogin = (data) => {
    return axios.post(`${api}login`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiChangePassword = (data) => {
    return axios.post(`${api}changePassword`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiSelectAccount = () => {
    return axios.get(`${apiAmazon}listProfiles`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiMainAccount = () => {
    return axios.get(`${apiAmazon}mainAccount`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiGetPermission = () => {
    return axios.get(`${otherApi}permission/getAdminPermission`, { headers })
        .then(res => res.data).catch(res => res.data)
}
export { ApiLogin, ApiSelectAccount, ApiMainAccount, ApiChangePassword, ApiGetPermission }
