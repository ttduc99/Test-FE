import logo from './logo.svg';
import './App.scss';
import MyComponent from './example/MyComponent.js'
import ListTodo from './Todos/ListTodo';
import Nav from './Nav/Nav';
import Home from'./example/Home';
import ListUser from './Users/ListUser';
import DetailUser from './Users/DetailUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <header className='App-header'>
      <Nav/>
        <img src={logo} className='App-logo' alt='logo' />
    

        {/* <MyComponent/> */}
        {/* <ListTodo /> */}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        <Switch>
          <Route path="/" exact>
          <Home/>
          </Route>
          <Route path="/todo">
            <ListTodo />
          </Route>
          <Route path="/about">
            <MyComponent />
          </Route>
          <Route path="/listuser" exact>
            <ListUser />
          </Route>
          <Route path="/listuser/:id">
            <DetailUser />
          </Route>
        </Switch>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
