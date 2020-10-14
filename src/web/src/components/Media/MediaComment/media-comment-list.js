import React from 'react';
import MediaCommentCard from './media-comment-card';

// parent: MediaComment
function MediaCommentList (props) {
  return (
    <div>
      {/* comments 가 있다면, MediaCommentCard list 설정 */}
      {props.comments && props.comments.map((comment, index) => (
        <MediaCommentCard
          key={index}
          author={comment.author}
          content={comment.content}
          commentId={comment.id}
          mediaId={props.mediaId}
          GET_COMMENTS={props.GET_COMMENTS}
        />
      ))}
    </div>

  );
}

export default MediaCommentList;