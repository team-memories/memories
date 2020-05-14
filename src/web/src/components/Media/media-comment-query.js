import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import MediaCommentList from './media-comment-list';

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
                body
            }
        }
    }
`;

function MediaCommentQuery (props) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { mediaId: props.mediaId },
    errorPolicy: 'all'
  });
  if (loading) return (<Spin tip={"Loading..."}/>);
  if (error) return (console.log(error));
  return (
    <div>
      <MediaCommentList comments={data.media.comments} />
    </div>
  );
}

export default MediaCommentQuery;