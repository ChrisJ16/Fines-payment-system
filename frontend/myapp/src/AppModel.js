import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Navigate as Redirect
} from "react-router-dom";

//import Owner from "./Owner";

function App() {
  const defaultRoute = window.location.pathname === "/" ? <Redirect to="/log-in"/> : undefined;
  //const defaultRoute =  <Redirect to="/log-in"/>;

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

      <Router>
        <Switch>
          <Route exact path="/log-in" element={<Login/>}/>
          {/* <Route exact path="/owner" element={<Owner/>}/> */}
        </Switch>
        {defaultRoute}
      </Router>
  );
}

export default App;
