import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/cronJob/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const ApiCronJobSchedularList = (data) => {
    return axios.post(`${api}getAllCronJobByProfile`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiCronJobHistoryList = (data) => {
    return axios.post(`${api}getAllCronJobHistory`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}



export { ApiCronJobSchedularList,ApiCronJobHistoryList}

