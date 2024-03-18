import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/superAdmin`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiBudgetRuleList = (data) => {
    return axios.post(`${api}/topPerformanceBudgetRuleByVendor`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiBudgetRuleList }

