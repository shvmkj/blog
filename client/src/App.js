import TopBar from "./components/topbar/TopBar";
import Home from './pages/homepage/Home'
import Register from "./pages/register/Register";
import Write from "./pages/write/Write"
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
import Settings from './pages/settings/Settings'
import Login from "./pages/login/Login";
import Singlepost from "./pages/singlepost/Singlepost";
function App() {
  const User = false;
  return (  
    <Router>
      <TopBar/>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/register">
          {User?<Home/>:<Register/>}
        </Route>
        <Route path="/login">
          {User?<Home/>:<Login/>}
        </Route>
        <Route path="/settings">
          {User?<Settings/>:<Login/>}
        </Route>
        <Route path="/write">
          {User?<Write/>:<Login/>}
        </Route>
        <Route path="/post/:postId">
          <Singlepost></Singlepost>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
