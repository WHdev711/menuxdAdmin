import axios from 'axios';
import { basePathAPI as basePath } from '../../constants/defaultValues';

// Authorization is required!
export const getStays = (token, clientId, path = basePath) => {
  return axios.get(`${path}/api/v1/stay/client/${clientId}`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const getStay = (id, token, path = basePath) => {
  return axios.get(`${path}/api/v1/stay/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};
