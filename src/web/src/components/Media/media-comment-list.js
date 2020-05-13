import React from 'react';
import MediaCommentCard from './media-comment-card';

// MediaCommentQuery 에서 query 문을 받는다.
function MediaCommentList (props) {
  return (
    <div>
      {/* comments 가 있다면, MediaCommentCard list 설정 */}
      {props.comments && props.comments.map((comment, index) => (
        <MediaCommentCard
          key={index}
          author={comment.author.name}
          profileImgUrl={comment.author.profileImgUrl}
          content={comment.body}
        />
      ))}
    </div>

  );
}

export default MediaCommentList;