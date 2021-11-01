import { SET_CLIENT } from '../../constants/actionTypes'

export const setClient = client => ({
  type: SET_CLIENT,
  payload: { client }
})
