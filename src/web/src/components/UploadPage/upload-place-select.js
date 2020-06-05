import { Cascader, Form } from 'antd';
import React from 'react';
import { LocationOptions, Layout } from '../constants';

function UploadPlaceSelect (props) {
  return (
    <Form.Item
      {...Layout}
      label="Location"
      rules={[
        {
          required: true,
          message: 'Please select location',
        },
      ]}
    >
      <Cascader
        options={LocationOptions}
        defaultValue={props.location.split(" ")}
        style={{ display: '100%' }}
        changeOnSelect
        onChange={props.onChange}
      />
    </Form.Item>
  );
}

export default UploadPlaceSelect;