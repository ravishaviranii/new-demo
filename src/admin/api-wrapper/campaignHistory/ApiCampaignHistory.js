import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/amazon/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiCampaignHistoryList = (data) => {
    return axios.post(`${api}getCampaignHistory`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}



export { ApiCampaignHistoryList }
