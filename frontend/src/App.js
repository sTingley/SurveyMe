import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SurveyDashboard from './components/SurveyDashboard';
import MakeASurvey from './components/MakeASurvey';
import Login from './components/Login';


import {getSession, logOut} from './helpers/AuthHelp'

export default function App() {


  return (
    <Router>
      <div>

        <nav>
          <ul>
            <li>
              <Link to='/Dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to="/MakeASurvey">Make A Survey</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
              <li>
                <input type="button" onClick={()=>logOut()}/>
              </li>
          </ul>
        </nav>

        <Route path="/" render={() => (
          getSession() ? (
            <App></App>
            ):(
          <Redirect to="/login" />
          )
        )} />

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/Dashboard">
          <SurveyDashboard />
        </Route>

        <Route path='/MakeASurvey'>
          <MakeASurvey />
        </Route>
      </div>
    </Router>
  );
}
