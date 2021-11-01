import axios from 'axios';
import { basePathAPI as basePath } from '../../constants/defaultValues';


export const loginUser = (email, password, path = basePath) => {
  return axios.post(`${path}/api/v1/login`, { email, password })
}

export const forgotPassword = (email, path = basePath) => {
  return axios.put(`${path}/api/v1/forgot-password/`, { email })
}

// Authorization is required!
export const changePassword = (id, email, password, confirmPassword, oldPassword, token, path = basePath) => {
  return axios.put(`${path}/api/v1/users/change-password/${id}`,
    { email, password, confirm_password: confirmPassword, old_password: oldPassword },
    { headers: { 'Authorization': `Bearer ${token}` } }
  )
}

export const getUsers = (token, path = basePath) => {
  return axios.get(`${path}/api/v1/users/`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getUser = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/users/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createUser = (user, token, path = basePath) => {
  return axios.post(`${path}/api/v1/users/`, user, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const editUser = (id, user, token, path = basePath) => {
  return axios.put(`${path}/api/v1/users/${id}`, user, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const deleteUser = (id, token, path = basePath) => {
  return axios.delete(`${path}/api/v1/users/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
