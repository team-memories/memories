import React from 'react';
import gql from "graphql-tag";
import MediaAddComment from './media-add-comment';
import MediaCommentList from './media-comment-list';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';

const GET_COMMENTS = gql`
    query ($mediaId: ID!){
        media(id: $mediaId) {
            id
            comments {
                id
                author {
                    id
                    profileImgUrl
                    name
                }
                content
            }
        }
    }
`;

// parent: MediaDetailCard
function MediaComment (props) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { mediaId: props.mediaId },
    errorPolicy: 'all'
  });
  if (loading) return (<Spin tip={"Loading..."}/>);
  if (error) return (console.log(error));
  return (
    <div>
      {/* 댓글 작성 */}
      <MediaAddComment mediaId={props.mediaId} GET_COMMENTS={GET_COMMENTS}/>
      {/* 기존의 댓글, 삭제 */}
      <MediaCommentList comments={data.media.comments} mediaId={props.mediaId} GET_COMMENTS={GET_COMMENTS}/>
    </div>
  );
}

export default MediaComment;