import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Form } from 'antd'
import LoginPageEmail from '../components/LoginPage/login-page-email'
import LoginPagePassword from '../components/LoginPage/login-page-password'
import LoginPageButton from '../components/LoginPage/login-page-button'

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
    if (email === "" || password === "") {
      alert("Email이나 Password를 입력해주세요.")
    }
    else {
      mutate({ variables: { email, password } }).then((data) => {
        sessionStorage.setItem("token", data.data.signIn.token)
        props.getToken()
        history.push('/')
      })
    }
  }
  return (
    <div style={{ maxWidth: '450px', margin: '13rem auto'}} >
      <h1>
        Login
      </h1>
      <Form>
        <LoginPageEmail getEmail={getEmail}/>
        <LoginPagePassword getPassword={getPassword}/>
        <LoginPageButton onClickLogin={onClickLogin}/>
      </Form>
    </div>
  )
}

export default LoginPage