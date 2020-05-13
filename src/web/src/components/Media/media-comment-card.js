import React  from 'react';
import { Comment, Avatar } from 'antd';

// single comment card
function MediaCommentCard (props) {
  return (
    <Comment
      author={props.author}
      avatar={
        <Avatar
          src={props.profileImgUrl}
          alt={props.author[0]}  // 이니셜
        />
      }
      content={
        // TODO(sujin) : 더보기, 간략히 기능 추가
        <p>
          {props.content}
        </p>
      }
    />
  );
}

export default MediaCommentCard;