import { DatePicker, Form } from 'antd';
import React from 'react';
import { Layout } from '../constants';
import PropTypes from 'prop-types';

const propTypes = {
  yesr: PropTypes.string,
  onChange: PropTypes.func,
};

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

UploadYearSelect.propTypes = propTypes;

export default UploadYearSelect;