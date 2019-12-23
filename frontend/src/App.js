import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";
import Cookie from 'js-cookie'

import Login from './routes/Login'
import './App.css';

function App() {
    let [loggedIn, setLoggedIn] = useState(Cookie.get('token') ? true : false)
    return (
        <div className="App">
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/about">About</NavLink>
                            </li>
                            {loggedIn ?
                                <li>
                                    <NavLink to="/logout">Logout</NavLink>
                                </li>
                                :
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            }
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/about">
                            <About />
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
                </div>
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
