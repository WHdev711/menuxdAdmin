import axios from 'axios'

import { basePathAPI as basePath } from '../../constants/defaultValues'

// Authorization is required!

export const getTables = (clientId, token, path=basePath) => {
  return axios.get(`${path}/api/v1/tables/client/${clientId}`, {headers: {'Authorization': `Bearer ${token}`}})
}

export const getTable = (id, token, path=basePath) => {
  return axios.get(`${path}/api/v1/tables/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
}

export const createTable = (table, token, path=basePath) => {
  return axios.post(`${path}/api/v1/tables/`, table, {headers: {'Authorization': `Bearer ${token}`}})
}

export const editTable = (id, table, token, path=basePath) => {
  return axios.put(`${path}/api/v1/tables/${id}`, table, {headers: {'Authorization': `Bearer ${token}`}})
}

export const deleteTable = (id, token, path=basePath) => {
  return axios.delete(`${path}/api/v1/tables/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
}
