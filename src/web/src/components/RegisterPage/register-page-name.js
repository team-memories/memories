import React from 'react'
import {Input, Form} from 'antd'

function RegisterPageName (props) {
  return (
    <div>
      <h4 style={{marginTop : '2rem'}}>
        Name
      </h4>
      <Form.Item
        name="email"
        rules={
          [{
            type: 'string',
            required: true,
            message: '이름을 입력하세요.'
          }
        ]}
      >
        <Input placeholder="Name" onChange={props.getName}/>
      </Form.Item>
    </div>
  )
}

export default RegisterPageName