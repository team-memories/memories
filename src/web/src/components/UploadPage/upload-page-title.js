import { Form, Input } from 'antd';
import React from 'react';
import { Layout } from '../constants';

function UploadPageTitle (props) {
  return (
    <Form.Item
      {...Layout}
      label="Title"
      rules={[
        {
          required: true,
          message: 'Please input title',
        },
      ]}
    >
      <Input placeholder="Title" onChange={props.onChange} value={props.title}/>
    </Form.Item>
  );
}

export default UploadPageTitle;
