import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiList = (data) => {
    return axios.post(`${api}/superAdmin/superAdminDashboard`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiTopPerformanceList = (data) => {
    return axios.post(`${api}/superAdmin/topPerformanceCampaignsByVendor`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiList, ApiTopPerformanceList }
