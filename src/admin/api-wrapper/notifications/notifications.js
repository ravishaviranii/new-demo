import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/notification`;
const authToken = localStorage.getItem("sellerToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const GetNotifications = () => {
  return axios
    .get(`${api}/get-notifications`, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ModifyNotification = (id) => {
  return axios
    .put(`${api}/modify-notification`, id, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ClearAllNotification = () => {
  return axios
    .put(`${api}/clear-all-notifications`, { headers })
    .then((res) => res.data)
    .catch((res) => res.data);
};

export { GetNotifications, ModifyNotification };
