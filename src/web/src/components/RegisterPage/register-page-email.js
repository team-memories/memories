import React from 'react'
import {Input, Form} from 'antd'
import { UserOutlined } from '@ant-design/icons';

function RegisterPageEmail (props) {
  return (
    <Form>
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
        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email" onChange={props.getEmail}/>
      </Form.Item>
    </Form>
  )
}

export default RegisterPageEmail