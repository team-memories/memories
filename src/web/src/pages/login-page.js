import React from 'react'
import LoginForm from '../components/LoginPage/loginForm'

function LoginPage() {
  return (
    <div style={{ maxWidth: '500px', margin: '13rem auto'}} >
      <h1>
        Login
      </h1>
      <LoginForm/>
    </div>
  )
}

export default LoginPage