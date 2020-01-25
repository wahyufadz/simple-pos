import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect,
    Link
} from "react-router-dom";
import Cookie from 'js-cookie'

import Login from './routes/Login'
import Register from './routes/Register'
import './App.css';

function App() {
    let [loggedIn, setLoggedIn] = useState(Cookie.get('token') ? true : false)
    return (
        <div className="App">
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/home">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                            {loggedIn ?
                                <li className="nav-item float-right">
                                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                </li>
                                :
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    {loggedIn ?
                        <Route path="/logout">
                            <Logout setLoggedIn={setLoggedIn} />
                        </Route>
                        :
                        <Route path="/login">
                            <Login setLoggedIn={setLoggedIn} />
                        </Route>
                    }
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Logout({ setLoggedIn }) {
    Cookie.remove('token')
    Cookie.remove('refreshToken')
    setLoggedIn(false)
    return <Redirect to='/login' />
}

export default App;
