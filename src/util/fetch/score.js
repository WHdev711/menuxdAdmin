import axios from 'axios'
import { basePathAPI as basePath } from '../../constants/defaultValues'


// Authorization is required!
export const getQuestions = (token, clientId, path = basePath) => {
  return axios.get(`${path}/api/v1/questions/client/${clientId}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getQuestion = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/questions/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const createQuestion = (question, token, path = basePath) => {
  return axios.post(`${path}/api/v1/questions/`, question, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const editQuestion = (id, question, token, path = basePath) => {
  return axios.put(`${path}/api/v1/questions/${id}`, question, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const deleteQuestion = (id, token, path = basePath) => {
  return axios.delete(`${path}/api/v1/questions/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
}
