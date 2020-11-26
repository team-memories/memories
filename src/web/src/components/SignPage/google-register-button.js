import React from 'react';
import gql from 'graphql-tag';
import GoogleLogin from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import '../../style/style.css';
const config = require('../../config');

const SIGN_UP_WITH_GOOGLE = gql`
  mutation ($googleId: String!, $email: String!, $name: String!, $profileImgUrl: String) {
    signUpWithGoogle(
      googleId: $googleId
      email: $email
      name : $name
      profileImgUrl : $profileImgUrl
    ) {
      token
    }
  }
`;

function GoogleRegisterButton (props) {
  const [mutate] = useMutation(SIGN_UP_WITH_GOOGLE, {
    onCompleted() {
      message.success("회원가입 완료!");
      history.goBack();
    },
    onError (e)  {
      console.log(e);
      if (!sessionStorage.getItem("user_isActive")) {
        message.error("존재하지 않는 회원입니다.");
      } else {
        message.error("중복된 이메일 입니다.");
      }
    }
  });
  const history = useHistory();

  const responseGoogle = (res) => {
    mutate({
      variables: {
        googleId: res.profileObj.googleId,
        email: res.profileObj.email,
        name: res.profileObj.name,
        profileImgUrl: res.profileObj.imageUrl
      }
    });
  };

  const errorGoogle = () => {
    message.error("google access 실패");
  };

  return (
    <GoogleLogin clientId={config.googleCloudId}
      buttonText={"구글 계정 회원가입"}
      onSuccess={responseGoogle}
      onFailure={errorGoogle}
      className={"google-button-class"}
    />
  );
}

export default GoogleRegisterButton;
