import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, message, Modal } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const DEACTIVATE_USER = gql`
  mutation deactivateUser($userId: ID!){
    deactivateUser(id: $userId) {
      name
    }
  }
`;

function UserDeactivateButton (props) {
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_profileImgUrl");
    window.location.replace('/');
  };
  const [deactivateUser] = useMutation(DEACTIVATE_USER, {
    onCompleted ({ deactivateUser: { name } }) {
      message.success(`${name}님의 회원 탈퇴가 성공하였습니다.`);
      // 로그아웃 & home
      logout();
    },
    onError () {
      message.error('탈퇴를 실패하였습니다.');
    }
  });

  const handleOnClick = () => {
    Modal.confirm({
      title: "회원탈퇴",
      content: "탈퇴를 진행하시겠습니까?",
      icon: <WarningOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deactivateUser({ variables: { userId: props.userId } });
      },
      onCancel() {
        message.error('탈퇴를 취소하였습니다.');
      },
    });
  };
  return (
    <Button style={{ float: 'right' }} onClick={handleOnClick}>회원탈퇴</Button>
  );
}

export default UserDeactivateButton;
