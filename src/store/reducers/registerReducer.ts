import { ErrorCallApiResponse } from '../services/callApi'
import { ActionDispatch } from './index'
import * as ActionTypes from '../actions'

export interface RegisterUserState {
  isLoading: boolean
  user: any
  error?: ErrorCallApiResponse & { isBrowser: boolean }
}
export const INITIAL_STATE_REGISTER_USER: RegisterUserState = {
  isLoading: true,
  user: null
}

export default function (state = INITIAL_STATE_REGISTER_USER, action: ActionDispatch) {
  const copyState = JSON.parse(JSON.stringify(state)) // Avoid JS mutation
  switch (action.type) {
    case ActionTypes.REGISTER_USER.REQUEST:
      delete copyState.error
      return {
        ...copyState,
        isLoading: true
      }
    case ActionTypes.REGISTER_USER.SUCCESS:
      delete copyState.error
      // eslint-disable-next-line no-case-declarations

      return {
        ...copyState,
        isLoading: false,
        user: action.response
      }
    case ActionTypes.REGISTER_USER.FAILURE:
      return {
        ...copyState,
        isLoading: false,
        error: { message: action.error?.message, name: action.error?.name, isBrowser: process.env.BROWSER }
      }

    default:
      return copyState
  }
}
