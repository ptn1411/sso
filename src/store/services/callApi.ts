import 'isomorphic-fetch'

const BASE_URL = process.env.BACKEND_BASE_URL

export type ErrorCallApiResponse = { name: string; message: string }
export type SuccessCallApiResponse = { results: unknown }

export type CallApiResponse = { response?: SuccessCallApiResponse; error?: ErrorCallApiResponse }

export default (endpoint: string, params: RequestInit): Promise<CallApiResponse> => {
  const url = new URL(`${BASE_URL}${endpoint}`)
  return fetch(url.href, params)
    .then((response) => {
      return response
        .json()
        .then((json) => {
          if (!json.status) {
            return Promise.reject(json.error)
          }
          return { json, response }
        })
        .catch((error) => {
          return Promise.reject(error)
        })
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        const error = { message: json.error.message, name: json.error.name }
        return Promise.reject(error)
      }
      return json
    })
    .then(
      (response) => {
        return { response }
      },
      (error) => {
        return { error: { name: error.name || 'Server', message: error.message || 'Internal Server Error' } }
      }
    )
}
