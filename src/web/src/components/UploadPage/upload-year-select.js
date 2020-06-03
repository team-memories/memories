import { DatePicker, Form } from 'antd';
import React from 'react';
import { Layout } from '../constants';
import moment from 'moment'

function UploadYearSelect (props) {
  return (
    <Form.Item
      {...Layout}
      label="Year"
      rules={[
        {
          required: true,
          message: 'Please select year',
        },
      ]}
    >
      <DatePicker
        picker="year"
        year={props.year}
        onChange={props.onChange}
        defaultValue={moment(props.year)}
      />
    </Form.Item>
  );
}

export default UploadYearSelect;