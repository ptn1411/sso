import { combineReducers } from 'redux'
import { ErrorCallApiResponse, SuccessCallApiResponse } from '../services/callApi'
import register, { RegisterUserState } from './registerReducer'

export interface ActionDispatch {
  type: string
  body: { dispatchKind?: string }
  response: SuccessCallApiResponse
  error: ErrorCallApiResponse
}

interface MainState {
  language: null | string | string[]
  timezone: null | string
  userAgent: null | unknown
  hostname: null | string
  user: null | any
}

export const INITIAL_STATE_MAIN: MainState = {
  language: null,
  timezone: null,
  userAgent: null,
  hostname: null,
  user: null
}

const main = (state = INITIAL_STATE_MAIN, action: ActionDispatch) => {
  const copyState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    default:
      return copyState
  }
}

/** *************************************************************************** */
/** ***************************** REDUCERS ************************************ */
/** *************************************************************************** */

export interface AppState {
  main: MainState

  register: RegisterUserState
}

export default combineReducers<AppState>({
  main,

  register
})
