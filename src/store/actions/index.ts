import { CallApiResponse, ErrorCallApiResponse, SuccessCallApiResponse } from '../services/callApi'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const createRequestTypes = (base: string) =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {} as Record<string, string>)

export const REGISTER_USER = createRequestTypes('REGISTER_USER')

const action = (
  type: string,
  payload?: { dispatchKind?: string; body?: unknown; response?: SuccessCallApiResponse; error?: ErrorCallApiResponse }
) => ({
  type,
  ...payload
})
export interface BaseAction {
  type: string
  payload?: any
}
export type ActionDispatcherResponse = { type: string; body?: unknown } & CallApiResponse
export interface ActionDispatcher {
  request: (body: unknown) => ActionDispatcherResponse
  success: (body: unknown, response: SuccessCallApiResponse) => ActionDispatcherResponse
  failure: (body: unknown, error: ErrorCallApiResponse) => ActionDispatcherResponse
}

export const registerUser: ActionDispatcher = {
  request: (body) => action(REGISTER_USER[REQUEST], { body }),
  success: (body, response) => action(REGISTER_USER[SUCCESS], { body, response }),
  failure: (body, error) => action(REGISTER_USER[FAILURE], { body, error })
}

export const registerUserAction = (user: any) => {
  return {
    type: REGISTER_USER.REQUEST,
    user
  }
}
