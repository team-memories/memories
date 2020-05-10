import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

// TODO(Lhyejin): error component 자세하게 구성
function ErrorView () {
  const history = useHistory();
  return (
    <Result
      title="Error"
      subTitle="새로고침을 하시거나 홈으로 돌아가세요"
      extra={[
        <Button type="primary" key="home" onClick={() => history.push('/')}>
          Home
        </Button>
      ]}
    >
    </Result>
  );
}

export default ErrorView;
