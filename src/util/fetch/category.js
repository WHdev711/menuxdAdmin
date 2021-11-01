import axios from 'axios';
import { basePathAPI as basePath } from '../../constants/defaultValues';


export const getCategoriesFile = (clientId, path = basePath) => `${path}/api/v1/categories/client/${clientId}/categories.json`;

// Authorization is required!

export const getCategories = (clientId, token, path = basePath) => {
  return axios.get(`${path}/api/v1/categories/client/${clientId}/admin`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const getCategory = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/categories/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const createCategory = (category, token, path = basePath) => {
  return axios.post(`${path}/api/v1/categories/`, category, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const createCategories = (clientId, file, token, path = basePath) => {
  const formData = new FormData();
  formData.append('categories', file);

  return axios.post(`${path}/api/v1/categories/client/${clientId}`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const editCategory = (id, category, token, path = basePath) => {
  return axios.put(`${path}/api/v1/categories/${id}`, category, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const updatePositionCategory = (categories, token, path = basePath) => {
  return axios.put(`${path}/api/v1/categories/position/`, categories, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const patchCategory = (id, category, token, path = basePath) => {
  return axios.patch(`${path}/api/v1/categories/${id}`, category, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const deleteCategory = (id, token, path = basePath) => {
  return axios.delete(`${path}/api/v1/categories/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};
