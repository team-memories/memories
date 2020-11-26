import React from 'react';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function UserEditButton () {
  return (
    <Link to={'/user/edit'}>
      <Button style={{ float: 'right' }}><UserOutlined/>회원정보수정</Button>
    </Link>
  );
}

export default UserEditButton;
