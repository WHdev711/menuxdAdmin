import axios from 'axios'

import { basePathAPI as basePath } from '../../constants/defaultValues'

// Authorization is required!

export const getWaiters = (clientId, token, path=basePath) => {
  return axios.get(`${path}/api/v1/waiters/client/${clientId}`, {headers: {'Authorization': `Bearer ${token}`}})
}

export const getWaiter = (id, token, path=basePath) => {
  return axios.get(`${path}/api/v1/waiters/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
}

export const createWaiter = (waiter, token, path=basePath) => {
  return axios.post(`${path}/api/v1/waiters/`, waiter, {headers: {'Authorization': `Bearer ${token}`}})
}

export const editWaiter = (id, waiter, token, path=basePath) => {
  return axios.put(`${path}/api/v1/waiters/${id}`, waiter, {headers: {'Authorization': `Bearer ${token}`}})
}

export const deleteWaiter = (id, token, path=basePath) => {
  return axios.delete(`${path}/api/v1/waiters/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
}
