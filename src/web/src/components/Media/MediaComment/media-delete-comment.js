import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';

const DELETE_COMMENT = gql`
    mutation($commentId: ID!) {
        deleteComment(id: $commentId) {
            id
            author {
                id
            }
            body
        }
    }
`;

// parent: MediaCommentCard
function MediaDeleteComment (props) {
  const [mutate] = useMutation(
    DELETE_COMMENT,
    {
      // mutation 보내면 query refetch
      refetchQueries: [{
        query: props.GET_COMMENTS, variables: { mediaId: props.mediaId }
      }]
    }
  );

  const variables = {
    commentId: props.commentId
  };

  const handleDelete = () => {
    mutate({ variables: variables }).then(() => {
      message.info('삭제되었습니다.');
    });
  };

  return (
    <Popconfirm
      title="정말 삭제하시겠습니까？"
      okText="Yes"
      cancelText="No"
      onConfirm={handleDelete}
    >
      <Button
        icon={<DeleteOutlined />}
        style={{
          border: 'none',
          background: '#f0f8ff',
          position: 'absolute',
          right: '2%',
          top: '1.5%'
        }}
      />
    </Popconfirm>
  );
}

export default MediaDeleteComment;