import { Cascader, Form } from 'antd'
import React from 'react'
import { LocationOptions } from '../constants'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
}

function UploadPlaceSelect (props) {
  return (
    <Form.Item
      {...layout}
      label="Location"
    >
      <Cascader
        options={LocationOptions}
        defaultValue={['대한민국']}
        style={{ display: '100%' }}
        changeOnSelect
        onChange={props.onChange}
        location={props.location}
      />
    </Form.Item>
  )
}

export default UploadPlaceSelect