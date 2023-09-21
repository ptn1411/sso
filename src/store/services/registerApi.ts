import callApi from './callApi'

export const registerUser = (user) => {
    return callApi('/register', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
}