import React from 'react';
import gql from 'graphql-tag';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import '../../style/style.css';
import { message } from 'antd';
const config = require('../../config');

const SIGN_IN_WITH_GOOGLE = gql`
  mutation ($googleId: String!) {
    signInWithGoogle(
      googleId: $googleId
    ) {
      token
      user {
        id
        name
        profileImgUrl
        email
      }
    }
  }
`;

function GoogleLoginButton (props) {
  const [mutate] = useMutation(SIGN_IN_WITH_GOOGLE, {
    onCompleted({signInWithGoogle: {token, user}}) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user_id", user.id);
      sessionStorage.setItem("user_name", user.name);
      sessionStorage.setItem("user_profileImgUrl", user.profileImgUrl);
      sessionStorage.setItem("user_email", user.email);
      sessionStorage.setItem("user_isActive", user.isActive);
      props.afterLogin();
      message.success("로그인 성공");
      history.goBack();
    },
    onError(e) {
      console.log(e);
      if (!sessionStorage.getItem("user_isActive")) {
        message.error("존재하지 않는 회원입니다.");
        // history.push('/register');
      }
      else {
        message.error("이메일과 비밀번호를 확인해주세요.");
      }
    }
  });
  const history = useHistory();

  const responseGoogle = (res) => {
    console.log(res.profileObj.googleId);
    mutate({ variables: { googleId:res.profileObj.googleId} });
  };

  const errorGoogle = () => {
    message.error("google access 실패");
  };

  return (
    <GoogleLogin clientId={config.googleCloudId}
      buttonText={"Sign In With Google"}
      onSuccess={responseGoogle}
      onFailure={errorGoogle}
      className={"google-button-class"}
    />
  );
}

export default GoogleLoginButton;
