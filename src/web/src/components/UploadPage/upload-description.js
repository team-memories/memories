import { Form, Input } from 'antd';
import React from 'react';
import { Layout } from '../constants';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func,
};

function UploadPageDescription (props) {
  return (
    <Form.Item
      {...Layout}
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
  );
}

export default UploadPageDescription;
