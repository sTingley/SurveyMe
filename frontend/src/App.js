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
              <Link to="/ViewSurveys">ViewSurveys</Link>
            </li>
            <li>
              <Link to="/MakeASurvey">Make A Survey</Link>
            </li>
            <li>
              <Link to="/login">Home</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" render={() => (
          getSession() ? (
          <SurveyDashboard/>
            ):(
          <Redirect to="/login" />
          )
        )} />

        <Route path="/login" render={() => <Login />} />

        <Route path="/ViewSurveys">
          <SurveyDashboard />
        </Route>


        <Route path='/MakeASurvey'>
          <MakeASurvey />
        </Route>
      </div>
    </Router>
  );
}
