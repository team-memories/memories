import React from 'react';
import { Col, Row } from 'antd';
import HeaderLogo from './header-logo';
import SearchBar from '../SearchBar/search-bar';
import HeaderIcons from './header-icons';

function Header () {
  return (
    <Row align='middle' style={{ backgroundColor: 'white', boxShadow: '5px 1px 7px #B8B8B8'}}>
      <Col style={{marginTop: '20px', marginBottom: '20px', marginLeft: '30px'}} xl={{marginleft: '50px'}}>
        <HeaderLogo/>
      </Col>
      <Col offset={2} xs={{span: 5, offset: 1}} sm={{span:7.5}} md={{span: 10}} xl={{span: 15}} xxl={{span: 15, offset: 2}} style={{marginTop: '10px', marginBottom:'10px'}}>
        <SearchBar/>
      </Col>
      <Col xxl={{offset: 1}}>
        <HeaderIcons/>
      </Col>
    </Row>
  );
}

export default Header;