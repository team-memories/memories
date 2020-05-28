import { Form, Input } from 'antd';
import React from 'react';
import { Layout } from '../constants';

const { TextArea } = Input;

function UploadPageDescription (props) {
  return (
    <Form.Item
      {...Layout}
      label="Description"
      name="Description"
      rules={[
        {
          required: true,
          message: 'Please input description',
        },
      ]}
    >
      <TextArea
        rows={4}
        placeholder="Description"
        description={props.description}
        onChange={props.onChange}
      />
    </Form.Item>
  );
}

export default UploadPageDescription;
