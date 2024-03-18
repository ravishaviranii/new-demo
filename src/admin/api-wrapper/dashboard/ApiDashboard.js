import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/amazon/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const ApiPriceDetails = (data) => {

    return axios.post(`${api}dashboard`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiChart = (data) => {
    return axios.post(`${api}dashboardChart`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiPerformanceCampaign = (data) => {
    return axios.post(`${api}topPerformanceCampaigns`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiTopformanceKeyword = (data) => {
    return axios.post(`${api}topPerformanceKeywords`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiPriceDetails, ApiChart ,ApiPerformanceCampaign,ApiTopformanceKeyword}
