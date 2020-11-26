import React from 'react';
import { Input, Form } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

function RegisterPageName (props) {
  return (
    <div>
      {/*이름을 입력하지않고 Register 버튼을 누르면 이름을 입력하세요 메세지 출력*/}
      <Form.Item
        name="name"
        rules={
          [{
            type: 'string',
            required: true,
            message: '이름을 입력하세요.'
          }
          ]}
      >
        <Input prefix={<ProfileOutlined className="site-form-item-icon"/>} placeholder="이름"
          onChange={props.onChangeName} size="large" style={{ border: 'none', borderBottom: '1px solid #d9d9d9' }}/>
      </Form.Item>
    </div>
  );
}

export default RegisterPageName;
