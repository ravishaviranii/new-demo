import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api/customer`
const otherApi = `${process.env.REACT_APP_API_BASE}/api`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiCountryList = () => {
    return axios.get(`${otherApi}/superAdmin/listAllCountries`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiCreate = (data) => {
    return axios.post(`${api}/adminRegister`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiCustomerList = (data) => {
    return axios.post(`${otherApi}/pages/listRemainingPages`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiSubCustomerList = (data) => {
    return axios.post(`${otherApi}/pages/getPageById`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiVendorList = (data) => {
    return axios.post(`${otherApi}/superAdmin/listAllCustomerWithoutPagination`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiSavePermission = (data) => {
    return axios.post(`${otherApi}/permission/applyPermission`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApigetPermissionByCustomer = (id) => {
    return axios.get(`${otherApi}/permission/getPermissionByCustomer/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdatePermission = (data) => {
    return axios.post(`${otherApi}/permission/updateCustomerPermission`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiAuthorizPermission = (data) => {
    return axios.post(`${otherApi}/permission/removeCustomerPagePermission`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}


const ApiGetPackage = (data) => {
    return axios.post(`${otherApi}/packages/getPackageWithoutPagination`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiStatusChange = (data) => {
    return axios.post(`${otherApi}/superAdmin/updateCustomerStatus`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdate = (data, id) => {
    return axios.post(`${otherApi}/superAdmin/update/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const Apidelete = (id) => {
    return axios.delete(`${otherApi}/superAdmin/deleteCustomer/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiPackageList = (data) => {
    return axios.get(`${otherApi}/packages/getAllPackages`, { headers })
        .then(res => res.data).catch(res => res.data)
}

export { ApiPackageList, Apidelete, ApiUpdate, ApiStatusChange, ApiGetPackage, ApiAuthorizPermission, ApiUpdatePermission, ApigetPermissionByCustomer, ApiSavePermission, ApiCountryList, ApiCreate, ApiCustomerList, ApiSubCustomerList, ApiVendorList }

