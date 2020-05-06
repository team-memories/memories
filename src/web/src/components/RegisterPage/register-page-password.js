import React from 'react'
import { Input, Form } from 'antd'
import { LockOutlined } from '@ant-design/icons';

function RegisterPagePassword (props) {
  return (
    <div>
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
        <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Password" onChange={props.getPassword}/>
      </Form.Item>
    </div>
  )
}

export default RegisterPagePassword