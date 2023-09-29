import { put, call, takeLatest, all, PutEffect, CallEffect } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import * as registerApi from '../services/registerApi'

import * as actions from '../actions'
import { ActionDispatcher, ActionDispatcherResponse, BaseAction } from '../actions'
import { CallApiResponse } from '../services/callApi'

// each entity defines 3 creators { request, success, failure }
const { REGISTER_USER, registerUser } = actions

function* fetchEntity(
  entity: ActionDispatcher,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiFn: (...args: any[]) => Promise<CallApiResponse>,
  body: unknown
): Generator<PutEffect<ActionDispatcherResponse> | CallEffect<CallApiResponse>, void, CallApiResponse> {
  yield put(entity.request(body))
  // eslint-disable-next-line no-unused-vars
  const { response, error } = yield call<(body: unknown) => Promise<CallApiResponse>>(apiFn, body)
  if (response) yield put(entity.success(body, response))
  else if (error) yield put(entity.failure(body, error))
}

// yeah! we can also bind Generators

export const registerFetch = (user: any) => fetchEntity.bind(null, registerUser, registerApi.registerUser, user)

/** *************************************************************************** */
/** ******************************* SAGAS ************************************* */
/** *************************************************************************** */

function* postRegisterUser(action: BaseAction): SagaIterator {
  const { response, error } = yield call(registerApi.registerUser, action.payload.user)
  if (response) yield put({ type: REGISTER_USER.SUCCESS, response })
  else if (error) yield put({ type: REGISTER_USER.FAILURE, error })
}
/** *************************************************************************** */
/** ***************************** WATCHERS ************************************ */
/** *************************************************************************** */

export default function* root(): SagaIterator {
  yield all([
    takeLatest(REGISTER_USER.REQUEST, postRegisterUser)
    // You use one saga watcher per redux reducer (for example)
    // fork(watchAccount),
    // fork(watchTheaters),
    // fork(watchOthers1),
    // fork(watchOthers2),
    // fork(watchOthers3),
    // fork(watchOthers4)
  ])
}
