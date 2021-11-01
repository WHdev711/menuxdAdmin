import axios from 'axios'
import { basePathAPI as basePath } from '../../constants/defaultValues'


export const getDishesFile = (clientId, path = basePath) => `${path}/api/v1/dishes/client/${clientId}/dishes.json`

// Authorization is required!
export const getDishes = (token, clientId, page = 1, path = basePath) => {
  return axios.get(`${path}/api/v1/dishes/client/${clientId}/${page}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getAllDishes = (token, clientId, path = basePath) => {
  return axios.get(`${path}/api/v1/dishes/client/${clientId}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getDishByCategory = (categoryId, token, path = basePath) => {
  return axios.get(`${path}/api/v1/dishes/category/${categoryId}?all=true`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getDish = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/dishes/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createDish = (dish, token, path = basePath) => {
  return axios.post(`${path}/api/v1/dishes/`, dish, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createDishes = (clientId, file, token, path = basePath) => {
  const formData = new FormData()
  formData.append('dishes', file)

  return axios.post(`${path}/api/v1/dishes/client/${clientId}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const editDish = (id, dish, token, path = basePath) => {
  return axios.put(`${path}/api/v1/dishes/${id}`, dish, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const deleteDish = (id, token, path = basePath) => {
  return axios.delete(`${path}/api/v1/dishes/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
