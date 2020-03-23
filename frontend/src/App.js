import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import SurveyDashboard from './components/SurveyDashboard';
import MakeASurvey from './components/MakeASurvey';
import Login from './components/Login';


import { getSession, logOut } from './helpers/AuthHelp'
import RegisterUser from "./components/RegisterUser";

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));





export default function App() {

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };


  const classes = useStyles();


  return (
    <Router>

      <AppBar position="static">
        <Toolbar variant="dense" onClick={handleClick}>
          <Link to='/Login' style={{ textDecoration: 'none', display: 'block' }}>
            <MenuItem onClick={handleClose}>
              <Typography variant="h6" color="inherit">
                Login
              </Typography>
            </MenuItem>
          </Link>
          <Link to='/Dashboard' style={{ textDecoration: 'none', display: 'block' }}>
            <MenuItem onClick={handleClose}>
              <Typography variant="h6" color="inherit">
                Dashboard
              </Typography>
            </MenuItem>
          </Link>
          <Link to='/RegisterUser' style={{ textDecoration: 'none', display: 'block' }}>
            <MenuItem onClick={handleClose}>
              <Typography variant="h6" color="inherit">
                RegisterUser
              </Typography>
            </MenuItem>
          </Link>
          <Link to='/MakeASurvey' style={{ textDecoration: 'none', display: 'block' }}>
            <MenuItem onClick={handleClose}>
              <Typography variant="h6" color="inherit">
                MakeASurvey
              </Typography>
            </MenuItem>
          </Link>
        </Toolbar>
      </AppBar>



      {/* 
      <div>
        <nav>
          <ul>
            <li>
              
            </li>
            <li>
              <Link to="/MakeASurvey">Make A Survey</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to='/RegisterUser'>New User</Link>
            </li>
            <li>
              <input type="button" onClick={() => logOut()} />
            </li>
          </ul>
        </nav>
 */}

      {/* this works dont ask me why */}
      <Route path="/" render={() => (
        getSession() ? (
          <App></App>
        ) : (
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
      <Route path='/RegisterUser'>
        <RegisterUser />
      </Route>

    </Router>
  );
}
