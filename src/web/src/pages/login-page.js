import React, { useState } from 'react'
import LoginForm from '../components/LoginPage/loginForm'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const SIGNIN = gql`
  mutation ($email: String!, $password: String!) {
    signIn(
      email: $email
      password: $password
    ) {
      token
    }
  }
`

function LoginPage(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mutate] = useMutation(SIGNIN)
  const history = useHistory()
  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  const onClickLogin = () => {
    mutate({ variables: { email, password } }).then((data) => {
      props.getToken(data.data.signIn.token)
      history.push('/')
    })
  }
  return (
    <div style={{ maxWidth: '500px', margin: '13rem auto'}} >
      <h1>
        Login
      </h1>
      <LoginForm getEmail={getEmail} getPassword={getPassword} onClickLogin={onClickLogin}/>
    </div>
  )
}

export default LoginPage