import React from 'react';
import MediaCommentCard from './media-comment-card';

// parent: MediaCommentQuery
function MediaCommentList (props) {
  return (
    <div>
      {/* comments 가 있다면, MediaCommentCard list 설정 */}
      {props.comments && props.comments.map((comment, index) => (
        <MediaCommentCard
          key={index}
          author={comment.author.name}
          authorId={comment.author.id}
          profileImgUrl={comment.author.profileImgUrl}
          content={comment.body}
          commentId={comment.id}
          mediaId={props.mediaId}
          GET_COMMENTS={props.GET_COMMENTS}
        />
      ))}
    </div>

  );
}

export default MediaCommentList;