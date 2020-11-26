import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../style/style.css';


function RegisterPageButton (props) {
  return (
    //Register 버튼을 누르면 회원가입 진행
    <Button className={"register-button-class"} htmlType="submit" onClick={props.onClickRegister}
      style={{ background: '#84868b', color: '#fff', height: '46px', fontWeight: 'bold', margin: '25px 0px' }}>
      <Link to="/register">회원가입</Link>
    </Button>
  );
}

export default RegisterPageButton;
