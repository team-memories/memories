import React from 'react';
import { Form, Input } from 'antd';
import { LockFilled } from '@ant-design/icons';

function SignPagePasswordConfirm (props) {
  return (
    <div>
      {/*미리 입력한 비밀번호와 일치하지 않으면 비밀번호가 일치하지 않습니다라는 메세지 추가*/}
      <Form.Item
        name="confirm"
        dependencies={[props.password]}
        hasFeedback
        rules={[
          {
            required: true,
            message: '비밀번호가 일치하지 않습니다.',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('비밀번호가 일치하지 않습니다.');
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockFilled/>} placeholder="비밀번호 확인"
          size="large" style={{ border: 'none', borderBottom: '1px solid #d9d9d9' }}/>
      </Form.Item>
    </div>
  );
}

export default SignPagePasswordConfirm;
