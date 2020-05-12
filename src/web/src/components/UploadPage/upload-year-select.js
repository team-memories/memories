import { DatePicker, Form } from 'antd';
import React from 'react';
import { Layout } from '../constants';

function UploadYearSelect (props) {
  return (
    <Form.Item
      {...Layout}
      label="Year"
      name="year"
    >
      <DatePicker
        picker="year"
        year={props.year}
        onChange={props.onChange}
      />
    </Form.Item>
  );
}

export default UploadYearSelect;