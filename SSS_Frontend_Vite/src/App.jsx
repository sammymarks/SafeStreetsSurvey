import { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import './App.css'

import Header from './components/Main/Header';
import Body from './components/Main/Body';

function App() {

  return (
    <div className='App'>
      
      <Header />
      <Body />

    </div>
  )
}

export default App
