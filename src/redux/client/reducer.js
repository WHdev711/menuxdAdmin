import { SET_CLIENT } from '../../constants/actionTypes'

const INIT_STATE = {
  client: null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_CLIENT:
      return { ...state, client: action.payload.client}
    default:
      return state
  }
}
