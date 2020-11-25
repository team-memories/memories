import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function SignPageEmail (props) {
  return (
    <div>
      {/*이메일을 입력하지않으면 이메일을 입력하세요 메세지 출력, 이메일 양식이 @ .com이 아니라도 출력*/}
      <Form.Item
        name="email"
        rules={
          [{
            type: 'email',
            required: true,
            message: '이메일을 입력하세요.'
          }
          ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="이메일"
          onChange={props.onChangeEmail} size="large" style={{ border: 'none', borderBottom: '1px solid #d9d9d9' }}/>
      </Form.Item>
    </div>
  );
}

export default SignPageEmail;
