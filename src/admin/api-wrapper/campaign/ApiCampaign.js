import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/amazon/`;
const otherApi = `${process.env.REACT_APP_API_BASE}/api/`;
const authToken = localStorage.getItem("sellerToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};


const ApiCampainListing = (data) => {
  return axios
    .post(`${api}getCampaigns`, data, { headers: { ...headers, PageName: "Campaigns", type: 'View Only' } })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiTopCampaignChart = (data) => {
  return axios
    .post(`${api}topCampaign`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiAddProductCampaign = (data) => {
  return axios
    .post(`${api}createCampaigns`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiAddBrandsCampaign = (data) => {
  return axios
    .post(`${api}createSBCampaigns`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiAddDisplayCampaign = (data) => {
  return axios
    .post(`${api}createSDCampaigns`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiEditBrandsCampaign = (data) => {
  return axios
    .post(`${api}updateSBCampaigns/${data.id}`, data.details, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiEditProductCampaign = (data) => {
  return axios
    .post(`${api}updateSPCampaigns/${data.id}`, data.details, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiEditDisplayCampaign = (data) => {
  return axios
    .post(`${api}updateSDCampaigns/${data.id}`, data.details, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiViewCampaign = (profileId, data) => {
  return axios
    .post(`${api}getCampaignIdData/${profileId}`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};
const ApiAmazonGetKeywordById = (data) => {
  return axios
    .post(`${api}getKeywordByAdId/${data.id}`, data.details, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

// by ravisha //
const ApiCreateCampaign = (data) => {
  return axios
    .post(`${api}createCampaigns`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiUpdateCampaign = (id, data) => {
  return axios
    .post(`${api}updateCampaigns/${id}`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiGetCampaignDataTable = (id, data) => {
  return axios
    .post(`${api}getCampaignDataTable/${id}`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiProductPerformance = (data) => {
  return axios
    .post(`${otherApi}product/topPerformanceProduct`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};


export {
  ApiCreateCampaign,
  ApiUpdateCampaign,
  ApiViewCampaign,
  ApiCampainListing,
  ApiAddProductCampaign,
  ApiAddBrandsCampaign,
  ApiAddDisplayCampaign,
  ApiEditBrandsCampaign,
  ApiEditProductCampaign,
  ApiEditDisplayCampaign,
  ApiAmazonGetKeywordById,
  ApiTopCampaignChart,
  ApiGetCampaignDataTable,
  ApiProductPerformance
};
