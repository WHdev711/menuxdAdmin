import axios from 'axios'
import { basePathAPI as basePath } from '../../constants/defaultValues'


// Authorization is required!

export const getOrders = (clientId, token, path = basePath) => {
    return axios.get(`${path}/api/v1/orders/client/${clientId}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const getOrdersActive = (clientId, token, path = basePath) => { 
    return axios.get(`${path}/api/v1/orders/active/${clientId}`, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const editOrder = (id, order, token, path = basePath) => {
    return axios.put(`${path}/api/v1/orders/${id}`, order, { headers: { 'Authorization': `Bearer ${token}` } })
}

export const editItem = (id, item, token, path = basePath) => {
    return axios.patch(`${path}/api/v1/orders/item/${id}`, item, { headers: { 'Authorization': `Bearer ${token}` } })
}
