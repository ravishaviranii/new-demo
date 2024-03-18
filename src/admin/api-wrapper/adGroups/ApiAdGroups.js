import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/adGroup/`
const apiAmazon = `${process.env.REACT_APP_API_BASE}/api/amazon/`
const authToken = localStorage.getItem('sellerToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiAdGroupsListing = (data) => {
    return axios.post(`${api}listAdGroups`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiListAdGroupNameBySortingAcos =(data)=>{
    return axios.post(`${api}listAdGroupNameBySortingAcos`, data, { headers })
    .then(res => res.data).catch(res => res.data)
}

const ApiAdGroupsCreateSP = (data) => {
    return axios.post(`${api}createSP`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiAdGroupsCreateSB = (data) => {
    return axios.post(`${api}createSB`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiAdGroupsCreateSD = (data) => {
    return axios.post(`${api}createSD`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiAdGroupsUpdateSP = (data) => {
    return axios.post(`${api}updateSP/${data.id}`, data.details, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiAdGroupsUpdateSB = (data) => {
    return axios.post(`${api}updateSB/${data.id}`, data.details, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiListCampaign = (data) => {
    return axios.post(`${apiAmazon}listCampaignName`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

// by ravisha //
const ApiCreateGroup = (data) => {
    return axios.post(`${api}createAdGroup`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdateGroup = (id,data) => {
    return axios.post(`${api}updateAdGroup/${id}`, data, { headers })
      .then((res) => res.data).catch((res) => res.data)
  };

  const ApiListGroupName = (data) => {
    return axios.post(`${api}listAdGroupName`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


export {ApiListGroupName,ApiUpdateGroup,ApiListAdGroupNameBySortingAcos,ApiCreateGroup,ApiListCampaign, ApiAdGroupsListing, ApiAdGroupsCreateSP, ApiAdGroupsCreateSB, ApiAdGroupsCreateSD, ApiAdGroupsUpdateSP, ApiAdGroupsUpdateSB }
