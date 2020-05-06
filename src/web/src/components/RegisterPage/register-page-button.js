import React from 'react'
import { Button, Form } from 'antd'

function RegisterPageButton (props) {
  return (
    <Form.Item>
      <Button htmlType="submit" onClick={props.onClickRegister} style={{marginInlineEnd: '70%'}}>
        Register
      </Button>
    </Form.Item>
  )
}

export default RegisterPageButton