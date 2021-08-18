import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./components/Login";
import SelectCard from "./pages/SelectCard";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/game/:id" component={Game} />
          <Route exact path="/selectcard" component={SelectCard} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
