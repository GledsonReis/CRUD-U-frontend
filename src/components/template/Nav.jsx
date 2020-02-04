import './Nav.css'
import React from 'react'
import NavItem from './NavItem'

export default props => 
  <aside className="menu-area">
    <nav className="menu">
      <NavItem path="" icon="home" title="Início"></NavItem>
      <NavItem path="users" icon="users" title="Usuários"></NavItem>
    </nav>
  </aside>