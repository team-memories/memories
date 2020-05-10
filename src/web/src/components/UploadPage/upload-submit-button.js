import React from 'react';
import { Button, Form } from 'antd';
import PropTypes from 'prop-types';

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const propTypes = {
  onClick: PropTypes.func,
};

function UploadSubmitButton (props) {
  return (
    <Form.Item {...tailLayout}>
      <Button
        type="primary"
        size="large"
        onChange={props.onClick}
      >
        Submit
      </Button>
    </Form.Item>
  );
}

UploadSubmitButton.propTypes = propTypes;

export default UploadSubmitButton;