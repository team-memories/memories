import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Form } from 'antd'
import RegisterPageEmail from '../components/RegisterPage/register-page-email'
import RegisterPagePassword from '../components/RegisterPage/register-page-password'
import RegisterPageButton from '../components/RegisterPage/register-page-button'
import RegisterPageName from '../components/RegisterPage/register-page-name'

const SIGNIN = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    signUp(
      email: $email
      password: $password
      name : $name
    ) {
      token
    }
  }
`

function RegisterPage () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [mutate] = useMutation(SIGNIN)
  const history = useHistory()

  //email state 변경
  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  //password state 변경
  const getPassword = (e) => {
    setPassword(e.target.value)
  }
  //name state 변경
  const getName = (e) => {
    setName(e.target.value)
  }
  //register 버튼이 눌렸을 때 실행, name, email, password가 입력되지 않았으면 alert로 경고
  //다 입력되었다면 mutate진행, 로그인 화면으로 이동
  const onClickRegister = () => {
    if (email === "" || password === "" || name === "") {
      alert("Name, Email, Password를 입력해주세요.")
    }
    else {
      mutate({ variables: { email, password, name } }).then(() => {
        history.goBack()
      })
    }
  }
  return (
    <div style={{ maxWidth: '450px', margin: '13rem auto'}} >
      <h1>
        Register
      </h1>
      <Form>
        <RegisterPageName getName={getName}/>
        <RegisterPageEmail getEmail={getEmail}/>
        <RegisterPagePassword getPassword={getPassword}/>
        <RegisterPageButton onClickRegister={onClickRegister}/>
      </Form>
    </div>
  )
}

export default RegisterPage