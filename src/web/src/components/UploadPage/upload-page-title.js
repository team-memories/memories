import { Form, Input } from 'antd'
import React from 'react'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
}

function UploadPageTitle (props) {
  return (
    <Form.Item
      {...layout}
      label="Title"
      name="title"
      rules={[{ required: false, message: 'title' }]}
    >
      <Input placeholder="Title" onChange={props.onChange}/>
    </Form.Item>
  )
}

export default UploadPageTitle
