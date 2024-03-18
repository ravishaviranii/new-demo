import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`;
const authToken = localStorage.getItem("superAdminToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const ApiGetProfile = (data) => {
  return axios
    .get(`${api}/superAdmin/getSuperAdminProfile`, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};


export { ApiGetProfile};
