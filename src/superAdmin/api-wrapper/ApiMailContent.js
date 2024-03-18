import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`;
const authToken = localStorage.getItem("superAdminToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const GetApiMailContent = () => {
  return axios
    .get(`${api}/mail-content/get-all-mail-content`, {
      headers,
    })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ModifyMailContent = (data) => {
  return axios
    .put(`${api}/mail-content/modify-mail-content`, data, {
      headers,
    })
    .then((res) => res)
    .catch((res) => res.data);
};

export { GetApiMailContent, ModifyMailContent };
