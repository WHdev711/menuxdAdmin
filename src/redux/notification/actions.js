import { NEW_NOTIFICATION, UPDATE_NOTIFICATION } from '../../constants/actionTypes';

export const newNotification = (data) => ({
  type: NEW_NOTIFICATION,
  payload: data
});

export const updateNotification = (id) => ({
  type: UPDATE_NOTIFICATION,
  payload: id
});
