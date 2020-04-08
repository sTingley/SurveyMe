import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import SurveyDashboard from './components/SurveyDashboard';
import MakeASurvey from './components/MakeASurvey';
import Login from './components/Login';
import Unauthorized from './Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterUser from "./components/RegisterUser";
import Inbox from './components/Inbox';
import Button from '@material-ui/core/Button'
import SendASurvey from "./components/SendASurvey";


export default function App() {

  const [user, setUser] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (uname) => {
    setUser(true);
    setUsername(uname)
  }

  const handleLogout = () => {
    setUser(false);
    setUsername("")
  }

  return (
    <div>
      <Router>
        <Link to='/dashboard'>View Dashboard</Link>
        <Link to='/makeasurvey'>Make a Survey</Link>
        <Link to='/registeruser'>Register New User</Link>
        <Link to='/inbox'> inbox </Link>
        <Link to='/sendasurvey'>Send A Survey</Link>
        <Button onClick={handleLogout}>Log Out</Button>
        <Route exact path='/' handleLogin={handleLogin} render={props => <Login {...props} user={user} handleLogin={handleLogin} />} />
        <ProtectedRoute exact path='/dashboard' user={user} username={username} component={SurveyDashboard} />
        <ProtectedRoute exact path='/makeasurvey' user={user} username={username} component={MakeASurvey} />
        <ProtectedRoute exact path='/inbox' user={user} username={username} component={Inbox} />
        <ProtectedRoute exact path='/sendasurvey' user={user} username={username} component={SendASurvey} />
        <Route exact path='/registeruser' component={RegisterUser}/>
        <Route exact path='/unauthorized' component={Unauthorized} />
      </Router>
    </div>
  );
}


