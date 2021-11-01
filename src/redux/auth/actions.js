import {
  LOGIN_USER,
  LOGOUT_USER
} from '../../constants/actionTypes'

export const loginUser = (user, token) => ({
  type: LOGIN_USER,
  payload: { user, token }
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})
