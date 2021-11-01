import { SET_ORDERS, UPDATE_ORDER_STATE } from '../../constants/actionTypes';

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders
});

export const updateOrderState = (data) => ({
  type: UPDATE_ORDER_STATE,
  payload: data
});
