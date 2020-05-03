import { Form, Input } from 'antd'
import React from 'react'
import { Layout } from '../constants'

function UploadPageTitle (props) {
  return (
    <Form.Item
      {...Layout}
      label="Title"
      name="title"
      rules={[{ required: false, message: 'title' }]}
    >
      <Input placeholder="Title" onChange={props.onChange}/>
    </Form.Item>
  )
}

export default UploadPageTitle
