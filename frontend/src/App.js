import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SurveyDashboard from './components/SurveyDashboard';
import MakeASurvey from './components/MakeASurvey';
import Login from './components/Login';
import Unauthorized from './Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';

import { getSession, logOut } from './helpers/AuthHelp'
import RegisterUser from "./components/RegisterUser";

import Button from '@material-ui/core/Button'


export default function App() {

  const [user, setUser] = useState({loggedIn: false, username: ""})


  const handleLogin = (username) => {
    setUser({loggedIn: true, username: username})
  }

  const handleLogout = () => {
    setUser({loggedIn: false, username: null});
  }

  return (
    <div>


      <Router>
        <Link to='/dashboard'>View Dashboard</Link>
        <Link to='/makeasurvey'>Make a Survey</Link>
        <Link to='/registeruser'>Register New User</Link>
        <button onClick={handleLogout}>Log Out</button>
        <Route exact path='/' handleLogin={handleLogin} render={props => <Login {...props} user={user} handleLogin={handleLogin} />} />
        <ProtectedRoute exact path='/dashboard' user={user} component={SurveyDashboard} />
        <ProtectedRoute exact path='/makeasurvey' user={user} component={MakeASurvey} />
        <Route exact path='/unauthorized' component={Unauthorized} />
      </Router>
    </div>
  );
}


