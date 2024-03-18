import axios from "axios";

const api = `${process.env.REACT_APP_API_BASE}/api`
const authToken = localStorage.getItem('superAdminToken')
const headers = { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiList = (data) => {
    return axios.post(`${api}/packages/get`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiReportList = () => {
    return axios.get(`${api}/module/listAll`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiCreate = (data) => {
    return axios.post(`${api}/packages/create`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdate = (id, data) => {
    return axios.post(`${api}/packages/update/${id}`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const Apidelete = (id) => {
    return axios.delete(`${api}/packages/delete/${id}`, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiGetVendorPackageHistory = (data) => {
    return axios.post(`${api}/packages/getVendorPackageHistory`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiGetPackageWithoutPagination = () => {
    return axios.get(`${api}/packages/getPackageWithoutPagination`, { headers })
        .then(res => res.data).catch(res => res.data)
}
const ApiUpdatePackageStatus = (data) => {
    return axios.post(`${api}/packages/updatePackageStatus`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiPackageRenewHandler = (data) => {
    return axios.post(`${api}/packages/reNewPackage`, data, { headers })
        .then(res => res.data).catch(res => res.data)

}


export { ApiList, ApiReportList, ApiCreate, ApiUpdate, Apidelete, ApiGetVendorPackageHistory, ApiUpdatePackageStatus, ApiGetPackageWithoutPagination, ApiPackageRenewHandler }
