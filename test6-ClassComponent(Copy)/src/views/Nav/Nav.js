import React from 'react';
import './nav.scss'
import {
    Link,NavLink    
  } from "react-router-dom"
class Nav extends React.Component {
  render() {
    return (
      <div className='topnav'>
          <NavLink to='/' activeClassName='active' exact>Home</NavLink>
          <NavLink to='/todo' activeClassName='active'>Todos</NavLink>
          <NavLink to='/about' activeClassName='active'>About</NavLink>
          <NavLink to='/listuser' activeClassName='active'>Users</NavLink>

        
          {/* <Link class='active' to='/'>Home</Link>
          <Link to='/todo'>Todos</Link>
          <Link to='/about'>About</Link> */}
        {/* <a class='active' href='/'>Home</a>
        <a href='/todo'>Todos</a>
        <a href='/about'>About</a> */}
      </div>
    );
  }
}
export default Nav;
