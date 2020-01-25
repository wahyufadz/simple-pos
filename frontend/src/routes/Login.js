import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Cookie from 'js-cookie'
import { Form, Button, Container, Row, Col, Jumbotron, Alert } from 'react-bootstrap'

export default function Login({ setLoggedIn }) {
    let
        [loginErr, setLoginErr] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),

        history = useHistory(),

        login = async () => {
            let body = { email, password }
            try {
                let res = await axios.post('http://127.0.0.1:3333/api/v1/auth/login', body, { accept: 'application/json' })
                if (res.data.hasOwnProperty('access_token')) {
                    // token expired after half day & browser closed
                    Cookie.set('token', res.data.access_token.token, { expires: .5 })
                    Cookie.set('refreshToken', res.data.access_token.refreshToken, { expires: .5 })
                    setLoggedIn(true)
                    history.push('/home')
                } else {
                    setLoginErr(res.data.error.message)
                }
            } catch (err) {
                console.log(err)
            }
        }

    return (
        <div className="login">
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Jumbotron>
                            <h1>Login</h1>
                            {loginErr ?
                                <Alert variant='danger'>{loginErr}</Alert>
                                :
                                <br />
                            }
                            <Form>

                                <Form.Group>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="please type your email"
                                        onChange={({ target }) => { setEmail(target.value) }}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="please type your password"
                                        onChange={({ target }) => { setPassword(target.value) }}
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    disabled={
                                        (email === "") || (password.length < 4)
                                    }
                                    onClick={e => {
                                        e.preventDefault()
                                        login()
                                    }}>login</Button>

                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
