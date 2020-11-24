import './App.css';
import HomePage from './components/HomePage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
