import { DatePicker, Form } from 'antd'
import React from 'react'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
}

function UploadYearSelect (props) {
  return (
    <Form.Item
      {...layout}
      label="Year"
      name="year"
    >
      <DatePicker
        picker="year"
        year={props.year}
        onChange={props.onChange}
      />
    </Form.Item>
  )
}

export default UploadYearSelect