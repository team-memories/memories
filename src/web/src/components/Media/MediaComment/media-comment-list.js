import React from 'react';
import MediaCommentCard from './media-comment-card';

// MediaCommentQuery 에서 query 문을 받는다.
function MediaCommentList (props) {
  return (
    <div>
      {/* comments 가 있다면, MediaCommentCard list 설정 */}
      {/* 최근 등록된 순서대로 정렬 (reverse) */}
      {props.comments && [...props.comments].reverse().map((comment, index) => (
        <MediaCommentCard
          key={index}
          author={comment.author.name}
          authorId={comment.author.id}
          profileImgUrl={comment.author.profileImgUrl}
          content={comment.body}
          commentId={comment.id}
        />
      ))}
    </div>

  );
}

export default MediaCommentList;