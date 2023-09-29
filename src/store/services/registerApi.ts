import callApi from './callApi'

export const registerUser = (user: any) => {
  return callApi('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
}
