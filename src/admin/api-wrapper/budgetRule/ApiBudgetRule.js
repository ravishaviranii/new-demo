import axios from "axios";


const api = `${process.env.REACT_APP_API_BASE}/api/budgetRule/`

const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const ApicreateRule = (data) => {
    return axios.post(`${api}createRule`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApigetRule = (data) => {
    return axios.post(`${api}getBudgetRules`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiRuleHistory=(data)=>{
    return axios.post(`${api}ruleHistory`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApideleteRule = (id) => {
    return axios.delete(`${api}deleteRule/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApistatusChange = (data,id) => {
    return axios.post(`${api}changeStatus/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiRuleConditions = (id) => {
    return axios.get(`${api}getRule/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiupdateRule = (id, data) => {
    return axios.post(`${api}updateRule/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


const ApigetCampaign = (data) => {
    return axios.post(`${api}getCampaignsName`, data,{ headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiRun = (id) => {
    return axios.get(`${api}manualRun/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}


export { ApiRun, ApicreateRule,ApigetRule,ApiRuleConditions,ApideleteRule,ApiupdateRule,ApigetCampaign,ApistatusChange,ApiRuleHistory}

