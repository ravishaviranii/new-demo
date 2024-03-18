import axios from "axios";
const api =`${process.env.REACT_APP_API_BASE}/api/keyword/`
const authToken=localStorage.getItem('sellerToken')
const headers={ Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' };

const ApiKeywordListing=(data)=>{
    return axios.post(`${api}listKeywords`,data,{headers})
    .then(res => res.data)
    .catch(res=>res.data)
}
const ApiCreateProduct = (data) => {
    return axios.post(`${api}createKeyword`, data, { headers })
        .then(res => res.data).catch(res => res.data)
}

const ApiUpdateProduct = (id, data) => {
    return axios.post(`${api}updateKeyword/${id}`, data, { headers })
        .then((res) => res.data).catch((res) => res.data)
};
const ApiKeyworUpdateSP=(data)=>{
    return axios.post(`${api}updateSP/${data.id}`,data.details,{headers})
    .then(res=>res.data)
    .catch(res=>res.data)
}
const ApiKeyworUpdateSB=(data)=>{
    return axios.post(`${api}updateSB/${data.id}`,data.details,{headers})
    .then(res=>res.data)
    .catch(res=>res.data)
}
const ApiListKeywordsNameBySortingAcos = (data)=>{
    return axios.post(`${api}listKeywordsNameBySortingAcos`,data,{headers})
    .then(res => res.data)
    .catch(res=>res.data)
}
export{ApiKeywordListing,ApiCreateProduct,ApiUpdateProduct,ApiListKeywordsNameBySortingAcos,ApiKeyworUpdateSP,ApiKeyworUpdateSB}
