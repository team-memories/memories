import React, { useState } from 'react';
import { Avatar, Button, Form, Input, message } from 'antd'
import { ColorArray } from '../components/constants';
import { useHistory } from 'react-router-dom';
import { LockFilled, LockOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserDeactivateButton from '../components/UserPage/user-deactivate-button'

const { Item } = Form;

const MODIFY_USER = gql`
    mutation ($id: ID!, $password: String!, $name: String!) {
      modifyUser(id: $id, password: $password, name: $name) {
        user {
          id
          name
        }
      }
    }
`;

const formItemLayout = {
  labelCol: { span: 3, offset: 5 },
  wrapperCol: { span: 7, offset: 2 },
};

function UserEditPage () {
  const [name, setName] = useState(sessionStorage.getItem('user_name'));
  const [password, setPassword] = useState('');
  const [mutate] = useMutation(MODIFY_USER);

  const history = useHistory();

  const onCancel = () => {
    history.goBack();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (name === '' || password === '') {
      message.info('빈칸을 채워주세요.');
    }
    else {
      const userId = sessionStorage.getItem('user_id');
      mutate({ variables: { id: userId, name: name, password: password } })
        .then(() => {
          message.info('수정이 완료되었습니다.');
          sessionStorage.setItem('user_name', name);
          window.location.replace('/user');
        })
        .catch(() => { message.error('수정에 실패하였습니다.'); });
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: 25, fontWeight: 500, width: '90%', margin: '5rem auto 4rem auto' }}>
        기본 회원 정보
      </h2>
      <Form {...formItemLayout} initialValues={{ name: name }}>
        <Item label="프로필">
          {
            sessionStorage.getItem('user_profileImgUrl') === 'null' ?
              <Avatar size={80}
                style={{ backgroundColor: ColorArray[sessionStorage.getItem('user_id') % ColorArray.length] }}>
                {sessionStorage.getItem('user_name').charAt(0)}
              </Avatar>
              :
              <Avatar size={80} src={sessionStorage.getItem('user_profileImgUrl')} shape="circle"/>
          }
        </Item>
        <Item label="이메일" name="email">
          <span>{sessionStorage.getItem('user_email')}</span>
        </Item>
        <Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력하세요.' }]}>
          <Input onChange={handleNameChange} value={name}/>
        </Item>
        <Item label="비밀번호" name="password" hasFeedback
          rules={[{ required: true, message: '비밀번호를 입력하세요.' }]}>
          <Input.Password prefix={<LockOutlined/>} onChange={handlePasswordChange}/>
        </Item>
        <Item
          label="비밀번호 확인"
          name="confirm"
          dependencies={['password']}
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
          ]}>
          <Input.Password prefix={<LockFilled/>}/>
        </Item>
        <Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button
            htmlType='submit'
            style={{
              background: '#4a5164',
              color: '#fff',
              marginRight: '2%',
              width: 105
            }}
            onClick={handleSubmit}
          >
            회원정보수정
          </Button>
          <Button
            onClick={onCancel}
            style={{
              width: 105,
              background: '#84868b',
              color: '#fff'
            }}>
            취소
          </Button>
        </Item>
      </Form>
      {/* 회원 탈퇴 */}
      <div style={{ width: '90%', margin: '3%', display: 'inline-block' }}>
        <UserDeactivateButton userId={sessionStorage.getItem('user_id')}/>
      </div>
    </div>
  );
}

export default UserEditPage;
