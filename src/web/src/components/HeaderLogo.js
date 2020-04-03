import React, { Component } from 'react'
import logo from '../Image/memories_logo.jpg'
import { Link } from 'react-router-dom'

export default class HeaderLogo extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            style={{width: '63px'}}
          />
        </Link>
      </div>
    )
  }
}