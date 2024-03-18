import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/campaignSchedule/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const APIcreateSchedule = (data) => {
    return axios.post(`${api}createSchedule`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const APIgetSchedule = (data) => {
    return axios.post(`${api}getSchedules`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const APIupdateSchedule = (id, data) => {
    return axios.post(`${api}updateSchedule/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


const APIdeleteSchedule = (id) => {
    return axios.delete(`${api}deleteSchedule/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}


const ApistatusChange = (data, id) => {
    return axios.post(`${api}changeMainStatusSchedule/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


const ApiRun = (id) => {
    return axios.get(`${api}manualRun/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}


export { ApiRun, ApistatusChange, APIcreateSchedule, APIgetSchedule, APIupdateSchedule, APIdeleteSchedule }
