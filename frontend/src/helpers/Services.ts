import Axios from "axios"

let server: string = 'http://localhost:3333/api/'
let prefix: string = 'v1/'

function defaultDomain() {
  return server + prefix
}

function header(token) {
  return {
    'Content-Type': 'application/x-www-form-erlencoded',
    'Accept': 'application/json',
    'Authorization': `bearer ${token}`
  }
}

export function apiLogin({ body }) {
  return Axios.post(`${defaultDomain()}auth/login`, body)
}

export function apiRegister({ body }) {
  return Axios.post(`${defaultDomain()}auth/register`, body)
}

export function apiChekUsernameEmail({ body }) {
  return Axios.post(`${defaultDomain()}auth/check-email-username`, body)
}