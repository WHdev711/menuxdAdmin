import { combineReducers } from 'redux';
import auth from './auth/reducer';
import client from './client/reducer';
import menu from './menu/reducer';
import notification from './notification/reducer';
import orders from './orders/reducer';
import settings from './settings/reducer';

const reducers = combineReducers({
  menu,
  settings,
  notification,
  orders,
  currentClient: client,
  authUser: auth,
});

export default reducers;
