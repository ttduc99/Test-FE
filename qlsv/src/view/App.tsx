import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import HandleStudent from './ListStudent/HandleStudent';
import HandleScore from './ListScore/handleScore';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Router>
          <Switch>
            <Route exact path='/' component={HandleStudent}/>
            <Route exact path="/listdiem/:id"component={HandleScore}/>
          </Switch>
        </Router>
        
          
      </header>
    </div>
  );
}

export default App;
