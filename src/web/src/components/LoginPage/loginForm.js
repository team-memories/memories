import React from 'react'
import {Input, Button, Form} from 'antd'

function LoginForm () {
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
        <Input />
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
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm