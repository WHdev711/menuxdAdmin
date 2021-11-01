import { NEW_NOTIFICATION, UPDATE_NOTIFICATION } from '../../constants/actionTypes';

const INIT_STATE = {
  notifications: [],
  orders: 0
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case NEW_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        orders: action.payload.type === 2 ? state.orders + 1 : state.orders
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state, notifications: state.notifications
          .map((n, i) => {
            if (i === action.payload) {
              n.active = false;
            }
            return n;
          })
      };
    default:
      return { ...state };
  }
};
