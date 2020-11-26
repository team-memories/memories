import React from 'react';
import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

function SignPagePassword (props) {
  return (
    <div>
      {/*비밀번호를 입력하지않으면 비밀번호를 입력하라는 메세지 출력*/}
      <Form.Item
        name="password"
        hasFeedback
        rules={
          [{
            required: true,
            message: '비밀번호를 입력하세요.'
          }
          ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="비밀번호"
          onChange={props.onChangePassword} size="large" style={{ border: 'none', borderBottom: '1px solid #d9d9d9' }}/>
      </Form.Item>
    </div>
  );
}

export default SignPagePassword;
