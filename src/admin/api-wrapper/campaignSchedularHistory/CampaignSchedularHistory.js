import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/campaignSchedule/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiCampaignSchedularHistoryList = (data) => {
    return axios.post(`${api}getScheduleHistory`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiCampaignSchedularHistoryList }