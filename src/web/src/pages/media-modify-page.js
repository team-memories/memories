import React from 'react';
import { Input,Row, Col } from 'antd';

function ModifyPage (props) {
  props.onChangeIsMediaView(window.location.pathname === "/watch");
  return (
    <Row>
      <Col style={{width: '60%'}}>
        <Input
          size="large"
          placeholder="제목(필수)"
          style={{borderRadius: '5px', marginBottom: "3%"}}
        />
        <Input
          size="large"
          placeholder="Description"
          style={{borderRadius: '5px'}}
        />
      </Col>
      test
      dadsadsdsasad
    </Row>
  );
}

export default ModifyPage;