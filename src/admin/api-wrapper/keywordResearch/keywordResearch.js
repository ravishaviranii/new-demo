import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/keyword/`;
const authToken = localStorage.getItem("sellerToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const KeywordResearchListing = (data) => {
  return axios
    .post(`${api}keywordSuggestion`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { KeywordResearchListing };
