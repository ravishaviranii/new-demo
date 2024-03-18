import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };


const ApiManualListCampaignsFromAmazon = (data) => {
    return axios.post(`${api}amazon/manualListCampaignsFromAmazon`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiManualGenerateCampaignReport = (data) => {
    return axios.post(`${api}amazon/manualGenerateReport`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiManualListAdGroupsFromAmazon = (data) => {
    return axios.post(`${api}adGroup/manualListAdGroupsFromAmazon`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApimanualGenerateAdGroupsReport = (data) => {
    return axios.post(`${api}adGroup/manualGenerateReport`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiManualListKeywordsFromAmazon = (data) => {
    return axios.post(`${api}keyword/manualListKeywordsFromAmazon`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApimanualGenerateKeywordsReport = (data) => {
    return axios.post(`${api}keyword/manualGenerateReport`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiManualListProductAdsFromAmazon = (data) => {
    return axios.post(`${api}product/manualListProductAdsFromAmazon`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApimanualGenerateProductAdsReport = (data) => {
    return axios.post(`${api}product/manualGenerateReport`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiManualListProductsFromAmazon = (data) => {
    return axios.post(`${api}product/manualListProductsFromAmazon`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiCronJobActive = (data) => {
    return axios.post(`${api}cronJob/changeStatusByProfile`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiPlacementReportFromAmazon = (data) => {
    return axios.post(`${api}placement/manualGenerateReport`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


export { ApiManualListCampaignsFromAmazon,ApiManualGenerateCampaignReport,ApiManualListAdGroupsFromAmazon,ApimanualGenerateAdGroupsReport,
    ApiManualListKeywordsFromAmazon,ApimanualGenerateKeywordsReport,ApiManualListProductAdsFromAmazon,ApimanualGenerateProductAdsReport,
    ApiManualListProductsFromAmazon,ApiCronJobActive,ApiPlacementReportFromAmazon}

