import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DEACTIVATE_USER = gql`
  mutation deactivateUser($userId: ID!){
    deactivateUser(id: $userId){
      name
    }
  }
`;

function UserDeactivateButton (props) {
  console.log(props.userId);
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
      message.success(`${name}님의 회원탈퇴가 성공하였습니다.`);
      // 로그아웃 & home
      logout();
    },
    onError () {
      message.error('탈퇴를 실패하였습니다.');
    }
  });
  const confirm = (userId) => {
    deactivateUser({variables: {userId}});
  };
  const cancel = () => {
    message.error('탈퇴를 취소하였습니다.');
  };
  // TODO(Lhyejin): delete button ui 집어넣기
  return (
    <Popconfirm
      title="탈퇴를 진행하시겠습니까?"
      onConfirm={() => confirm(props.userId)}
      onCancel={cancel}
      okText={'Yes'}
      cancelText={'No'}
    >
      <Button danger> 회원탈퇴 </Button>
    </Popconfirm>
  );
}

export default UserDeactivateButton;
