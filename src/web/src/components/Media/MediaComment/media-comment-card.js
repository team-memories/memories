import React, { useState } from 'react';
import { Comment, Avatar, Button } from 'antd';
import MediaDeleteComment from './media-delete-comment';
import ShowMoreText from './react-show-more-text';
import { RedoOutlined } from '@ant-design/icons';
import MediaModifyComment from './media-modify-comment'

// single comment card
// parent: MediaCommentList
function MediaCommentCard (props) {
  const [modify,setModify] = useState(false)
  if (modify) {
    return (
      <MediaModifyComment mediaId={props.mediaId} commentId={props.commentId} GET_COMMENTS={props.GET_COMMENTS} content={props.content} modify={{modify}} content={props.content} setModify={setModify}/>
    )
  }
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
                  <p style={{width: '95%'}}>{props.content}</p>
                </ShowMoreText>
                <Button icon={<RedoOutlined />} style={{ border: 'none', background: '#f0f8ff', position: 'absolute', right: '6%', top: '1.5%'}} onClick={()=> setModify(!modify)}/>
                <MediaDeleteComment
                  commentId={props.commentId}
                  mediaId={props.mediaId}
                  GET_COMMENTS={props.GET_COMMENTS}
                />
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
                <p style={{width: '95%'}}>{props.content}</p>
              </ShowMoreText>
            }
            style={{ marginBottom: '1%'}}
          /> 
      }
    </div>
  );
}

export default MediaCommentCard;