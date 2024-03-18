import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/configAds/`
const adsapi = `${process.env.REACT_APP_API_BASE}/api/amazon/`
const profileApi = `${process.env.REACT_APP_API_BASE}/api/customer/`
const themeApi = `${process.env.REACT_APP_API_BASE}/api/theme/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiLinkAamazon = (data) => {
    return axios.post(`${api}connectAccount`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiAuthenticationAamazon = () => {
    return axios.get(`${api}configAccount`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiCheckAmazonConnection = (data) => {
    return axios.post(`${api}checkConnectAccount`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUnlinkAmazonConnection = () => {
    return axios.post(`${api}unlinkConnectAccount`, {}, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiSelectAccount = () => {
    return axios.get(`${adsapi}listProfiles`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiLink = () => {
    return axios.get(`${profileApi}getProfile`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiThemeList = (data) => {
    return axios.post(`${themeApi}list`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiCustomFilter = (data) => {
    return axios.post(`${adsapi}customFilter`,data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiLinkAamazon, ApiAuthenticationAamazon, ApiCheckAmazonConnection, ApiUnlinkAmazonConnection, ApiSelectAccount, ApiLink, ApiThemeList,ApiCustomFilter }
