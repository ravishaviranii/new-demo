import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/superAdmin`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiCampaignList = (data) => {
    return axios.post(`${api}/topPerformanceCampaignsByVendor`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiCampaignList }

