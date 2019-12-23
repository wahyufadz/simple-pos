import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookie from 'js-cookie'

export default function Login({ setLoggedIn }) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let history = useHistory()
    let login = async e => {
        e.preventDefault()
        let body = { email, password }
        let res = await axios.post('http://127.0.0.1:3333/api/v1/auth/login', body)
        console.log(res)
        if (res.data.hasOwnProperty('access_token')) {
            // token expired after 1s & browser closed
            Cookie.set('token', res.data.access_token.token, { expires: .00001 })
            Cookie.set('refreshToken', res.data.access_token.refreshToken, { expires: .00001 })
            setLoggedIn(true)
            history.push('/home')
        }
    }
    return (
        <div className="login">
            <h2>Login</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={({ target }) => { setEmail(target.value) }}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={({ target }) => { setPassword(target.value) }}
                />
                <br />
                <button onClick={e => login(e)}>login</button>

            </form>
        </div>
    )
}
