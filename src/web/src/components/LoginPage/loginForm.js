import React from 'react'
import {Input, Button, Form} from 'antd'

function LoginForm (props) {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  
  return (
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    >
      <h4 style={{marginTop : '2rem'}}>
        Email address
      </h4>
      <Form.Item
        name="email"
        rules={
          [{
            type: 'email',
            required: true,
            message: '이메일을 입력하세요.'
          }
        ]}
      >
        <Input onChange={props.getEmail}/>
      </Form.Item>
      <h4 style={{marginTop : '1rem'}}>
        Password
      </h4>
      <Form.Item
        name="password"
        rules={
          [{
            required: true,
            message: '비밀번호를 입력하세요.'
          }
        ]}
      >
        <Input.Password onChange={props.getPassword}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={props.onClickLogin}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm