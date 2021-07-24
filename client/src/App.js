import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game';
import Login from './components/Login';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/game" component={Game}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
