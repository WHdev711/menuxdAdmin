import {
  LOGIN_USER,
  LOGOUT_USER
} from '../../constants/actionTypes'

const INIT_STATE = {
  user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null,
  token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
    case LOGOUT_USER:
      return { ...state, user: null, token: null }
    default:
      return { ...state }
  }
}
