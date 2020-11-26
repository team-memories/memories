import React from 'react';
import { Button, Form } from 'antd';
import '../../style/style.css';

function LoginPageButton (props) {
  return (
    //Log in 버튼과 Register가 있음, Log in버튼을 누르면 로그인 진행, Register를 누르면 회원가입 화면 이동
    <Form.Item>
      <Button htmlType="submit" onClick={props.onClickLogin} className={"login-button-class"}
        style={{ background: '#4a5164', color: '#fff', height: '56px', fontWeight: 'bold' }}>
        로그인
      </Button>
    </Form.Item>
  );
}

export default LoginPageButton;
