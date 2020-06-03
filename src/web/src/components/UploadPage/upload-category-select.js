import { Select, Form } from 'antd';
import React from 'react';
import { Layout } from '../constants';

function UploadCategorySelect (props) {
  return (
    <Form.Item
      {...Layout}
      label="Category"
    >
      <Select onChange={props.onChange} value={props.category}>
        <Select.Option value="CITY">도시</Select.Option>
        <Select.Option value="NATURE">자연</Select.Option>
        <Select.Option value="OBJECT">사물</Select.Option>
      </Select>
    </Form.Item>
  );
}

export default UploadCategorySelect;