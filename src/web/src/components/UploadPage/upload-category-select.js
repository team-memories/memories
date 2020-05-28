import { Select, Form } from 'antd';
import React from 'react';
import { Layout } from '../constants';

function UploadCategorySelect (props) {
  return (
    <Form.Item
      {...Layout}
      label="Category"
      name="category"
    >
      <Select onChange={props.onChange}>
        <Select.Option value="CITY">도시</Select.Option>
        <Select.Option value="NATURE">자연</Select.Option>
        <Select.Option value="OBJECT">사물</Select.Option>
      </Select>
    </Form.Item>
  );
}

export default UploadCategorySelect;