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
        defaultValue={['대한민국']}
        style={{ display: '100%' }}
        changeOnSelect
        onChange={props.onChange}
        location={props.location}
      />
    </Form.Item>
  );
}

export default UploadPlaceSelect;