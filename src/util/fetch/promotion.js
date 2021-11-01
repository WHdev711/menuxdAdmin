import axios from 'axios';
import { basePathAPI as basePath } from '../../constants/defaultValues';


// Authorization is required!
export const getPromotions = (token, clientId, path = basePath) => {
    return axios.get(`${path}/api/v1/promotions/client/${clientId}?all=true`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const getPromotion = (id, token, path = basePath) => {
    return axios.get(`${path}/api/v1/promotions/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const createPromotion = (promotion, token, path = basePath) => {
    return axios.post(`${path}/api/v1/promotions/`, promotion, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const editPromotion = (id, promotion, token, path = basePath) => {
    return axios.put(`${path}/api/v1/promotions/${id}`, promotion, { headers: { 'Authorization': `Bearer ${token}` } });
};

export const deletePromotion = (id, token, path = basePath) => {
    return axios.delete(`${path}/api/v1/promotions/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
};
