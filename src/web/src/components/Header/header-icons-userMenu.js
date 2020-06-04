import React, { useState } from 'react';
import { Button, Popover, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import { ColorArray } from '../constants';

function UserMenu () {
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_profileImgUrl");
    window.location.replace('/');
  };
  const [clicked, handleClickedChange] = useState(false);

  const handleClickChange = (visible) => {
    handleClickedChange(visible);
  };

  const hidePopover = () => {
    handleClickedChange(false);
  };

  const title = (
    <div>
      <p/>
      <Card.Meta
        avatar={
          sessionStorage.getItem("user_profileImgUrl") === 'null'?
            <Avatar size={45} style={{backgroundColor: ColorArray[sessionStorage.getItem("user_id") % ColorArray.length]}}>
              {sessionStorage.getItem("user_name").charAt(0)}
            </Avatar>
            :
            <Avatar size={45} src={sessionStorage.getItem("user_profileImgUrl")}  shape="circle" />
        }
        description={
          <div>
            <h4>
              {sessionStorage.getItem("user_name")}
            </h4>
            {sessionStorage.getItem("user_email")}
          </div>
        }
      />
      <p/>
    </div>
  );
  const content = (
    <div>
      <p>
        <Link to="/user">
          <Button type="link" onClick={hidePopover}>
            내 앨범
          </Button>
        </Link>
      </p>
      <Button type="link" onClick={logout}>
        로그아웃
      </Button>
    </div>
  );
  //logout 버튼을 누르면 sessionSotrage에 있는 token을 지우고 홈으로 이동
  return (
    <Popover title={title} content={content} placement="bottom" trigger="click" visible={clicked} onVisibleChange={handleClickChange}>
      <Button type="link" ghost>
        {sessionStorage.getItem("user_profileImgUrl") === 'null'?
          <Avatar size={30} style={{backgroundColor: ColorArray[sessionStorage.getItem("user_id") % ColorArray.length]}}>
            {sessionStorage.getItem("user_name").charAt(0)}
          </Avatar>
          :
          <Avatar size={30} src={sessionStorage.getItem("user_profileImgUrl")}  shape="circle" />
        }
      </Button>
    </Popover>
  );
}

export default UserMenu;