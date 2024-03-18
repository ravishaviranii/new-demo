import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`;
// const otherApi = `${process.env.REACT_APP_API_BASE}/api`;
const authToken = localStorage.getItem("superAdminToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const ApiCreateDirectAccess = (data) => {
  return axios
    .post(`${api}/direct-access/create-direct-access`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiCreateDirectAccessList = (data) => {
  return axios
    .post(`${api}/direct-access/get-direct-access`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { ApiCreateDirectAccess, ApiCreateDirectAccessList };
