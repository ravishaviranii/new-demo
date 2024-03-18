import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/supportCategory`;
const authToken = localStorage.getItem("superAdminToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const ApiCatList = (data) => {
  return axios
    .post(`${api}/listAllCategory`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};
const ApiCreate = (data) => {
  return axios
    .post(`${api}/createCategory`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ApiUpdate = (data, id) => {
  return axios
    .post(`${api}/updateCategory/${id}`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};
const Apidelete = (id) => {
  return axios
    .delete(`${api}/deleteCategory/${id}`, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};
const ApistatusChange = (data, id) => {
  return axios
    .post(`${api}/changeStatus/${id}`, data, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { ApiCatList, ApiCreate, ApiUpdate, Apidelete, ApistatusChange };
