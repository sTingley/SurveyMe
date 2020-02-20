import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SurveyDashboard from './components/SurveyDashboard';
import MakeASurvey from './components/MakeASurvey';

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
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/ViewSurveys">
            <SurveyDashboard />
          </Route>
        </Switch>
        <Switch>
          <Route path='/MakeASurvey'>
            <MakeASurvey/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
