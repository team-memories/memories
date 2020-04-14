import React, { Component } from 'react'
import logo from '../Image/logo.png'
import { Link } from 'react-router-dom'

export default class HeaderLogo extends Component {
  render() {
    return (
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          style={{width: '150px', paddingLeft: '15px'}}
        />
      </Link>
    )
  }
}