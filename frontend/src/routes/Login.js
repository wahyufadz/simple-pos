import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export default function Login() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loggedIn, setLoggedIn] = useState(false)
    let login = async e => {
        e.preventDefault()
        let body = { email, password }
        let res = await axios.post('http://127.0.0.1:3333/api/v1/auth/login', body)
        console.log(res)
        if (res.data.hasOwnProperty('access_token')) {
            setLoggedIn(true)
        }
    }
    return (
        <div className="login">
            {loggedIn ? <Redirect to="/about" /> : ""}
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
