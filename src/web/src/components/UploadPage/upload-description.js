import { Form, Input } from 'antd'
import React from 'react'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
}

const { TextArea } = Input

function UploadPageDescription (props) {
  return (
    <Form.Item
      {...layout}
      label="Description"
      name="Description"
      rules={[{ required: false, message: 'Description' }]}
    >
      <TextArea
        rows={4}
        placeholder="Description"
        description={props.description}
        onChange={props.onChange}
      />
    </Form.Item>
  )
}

export default UploadPageDescription
