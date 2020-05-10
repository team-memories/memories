import { Form, Input } from 'antd';
import React from 'react';
import { Layout } from '../constants';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func,
};

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
  );
}

UploadPageTitle.propTypes = propTypes;

export default UploadPageTitle;
