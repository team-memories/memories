import React from 'react';
import { Comment, Avatar } from 'antd';
import MediaCommentDeleteButton from './media-comment-delete-button';
import ShowMoreText from './react-show-more-text';

// single comment card
// TODO(sujin) : 더보기, 간략히 기능 추가
function MediaCommentCard (props) {
  return (
    <div>
      {
        (props.authorId === sessionStorage.getItem("user_id")) ?
          // 나의 댓글 - 배경 색이 있고 delete button 추가
          <Comment
            author={props.author}
            avatar={
              <Avatar
                src={props.profileImgUrl}
                alt={props.author[0]}  // 이니셜
              />
            }
            content={
              <div>
                <ShowMoreText more='더보기' less='간략히 보기'>
                  <p>{props.content}</p>
                </ShowMoreText>
                <MediaCommentDeleteButton commentId={props.commentId} />
              </div>
            }
            style={{ background: '#f0f8ff', marginBottom: '1%'}}
          />
          // 다른 사람의 댓글
          : <Comment
            author={props.author}
            avatar={
              <Avatar
                src={props.profileImgUrl}
                alt={props.author[0]}  // 이니셜
              />
            }
            content={
              <ShowMoreText more='더보기' less='간략히 보기'>
                <p>{props.content}</p>
              </ShowMoreText>
            }
            style={{ marginBottom: '1%'}}
          /> 
      }
    </div>
  );
}

export default MediaCommentCard;