import { DatePicker, Form } from 'antd'
import React from 'react'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
}

function UploadDateSelect (props) {
  return (
    <Form.Item
      {...layout}
      label="Date"
      name="date"
    >
      <DatePicker
        picker="year"
        date={props.date}
        onChange={props.onChange}
      />
    </Form.Item>
  )
}

export default UploadDateSelect