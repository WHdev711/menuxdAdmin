import { SET_ORDERS, UPDATE_ORDER_STATE } from '../../constants/actionTypes';

const INIT_STATE = {
  oders: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case UPDATE_ORDER_STATE:
      return {
        ...state, orders: state.orders
          .map((ors) => {
            return ors.map(o => {
              if (o.table.id === action.payload.tableId) {
                if (action.payload.type === "waiter") {
                  o.table.calls_waiter = !o.table.calls_waiter;
                } else if (action.payload.type === "bill") {
                  o.table.asks_for_bill = !o.table.asks_for_bill;
                }
              }

              return o;
            })
          })
      };
    default:
      return { ...state };
  }
};
