import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/Home/Home'
import Profile from './pages/profile/Profile';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
