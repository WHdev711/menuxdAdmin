import axios from 'axios';
import { basePathAPI as basePath } from '../../constants/defaultValues';


// Authorization is required!
export const getAds = (token, clientId, path = basePath) => {
  return axios.get(`${path}/api/v1/ads/client/${clientId}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getAd = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/ads/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createAd = (ad, token, path = basePath) => {
  return axios.post(`${path}/api/v1/ads/`, ad, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const editAd = (id, ad, token, path = basePath) => {
  return axios.put(`${path}/api/v1/ads/${id}`, ad, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const patchAd = (id, ad, token, path = basePath) => {
  return axios.patch(`${path}/api/v1/ads/${id}`, ad, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const deleteAd = (id, token, path = basePath) => {
  return axios.delete(`${path}/api/v1/ads/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
