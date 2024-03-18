import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`;
const authToken = localStorage.getItem("superAdminToken");
const headers = {
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
};

const GetApiNotificationcontent = () => {
  return axios
    .get(`${api}/notification-content/get-all-notification-content`, {
      headers,
    })
    .then((res) => res.data)
    .catch((res) => res.data);
};

const ModifyNotificationcontent = (data) => {
  return axios
    .put(`${api}/notification-content/modify-notification-content`, data, {
      headers,
    })
    .then((res) => res)
    .catch((res) => res.data);
};

const CreateDynamicNotificationcontentForVendors = (data) => {
  return axios
    .post(
      `${api}/notification-content/create-dynamic-notification-vendors`,
      data,
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((res) => res.data);
};

const CreateDynamicNotificationContentForLocations = (data) => {
  return axios
    .post(
      `${api}/notification-content/create-dynamic-notification-locations`,
      data,
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((res) => res.data);
};

const CreateDynamicNotificationContentForPackages = (data) => {
  return axios
    .post(
      `${api}/notification-content/create-dynamic-notification-packages`,
      data,
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((res) => res.data);
};

export {
  GetApiNotificationcontent,
  ModifyNotificationcontent,
  CreateDynamicNotificationcontentForVendors,
  CreateDynamicNotificationContentForLocations,
  CreateDynamicNotificationContentForPackages,
};
