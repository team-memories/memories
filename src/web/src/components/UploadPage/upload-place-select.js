import { Cascader, Form } from 'antd';
import React from 'react';
import { LocationOptions, Layout } from '../constants';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func,
  location: PropTypes.string,
};

function UploadPlaceSelect (props) {
  return (
    <Form.Item
      {...Layout}
      label="Location"
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

UploadPlaceSelect.propTypes = propTypes;

export default UploadPlaceSelect;