import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'antd'

function LoginPageButton (props) {
  return (
    <Form.Item>
      <Button htmlType="submit" onClick={props.onClickLogin} style={{marginInlineEnd: '70%'}}>
        Log in
      </Button>
      <Link to="/register">
        Register
      </Link>
    </Form.Item>
  )
}

export default LoginPageButton