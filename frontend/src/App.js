import React, {useState} from "react";
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

  const [user, setUser] = useState(false)


  const handleLogin =() => {
    setUser(true)
  }

  const handleLogout = () => {
    setUser(false);
  }

  return (
    <div>
    <Router>
      <Route exact path='/' handleLogin={handleLogin} render={props=><Login {...props} user={user.toString()} handleLogin={handleLogin} />}/>
      <ProtectedRoute exact path='/dashboard' user={user} handleLogout={handleLogout} component={SurveyDashboard} />
      <Route exact path='/unauthorized' component={Unauthorized} />
    </Router>
    </div>
  );
}
