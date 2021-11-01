import axios from 'axios'

import { basePathAPI as basePath } from '../../constants/defaultValues'

// Authorization is required!

export const getClients = (userId, token, path = basePath) => {
  return axios.get(`${path}/api/v1/clients/user/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getClient = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/clients/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createClient = (client, token, path = basePath) => {
  return axios.post(`${path}/api/v1/clients/`, client, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export const editClient = (id, client, token, path = basePath) => {
  return axios.put(`${path}/api/v1/clients/${id}`, client, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const deleteClient = (id, token, path = basePath) => {
  return axios.delete(`${path}/api/v1/clients/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
