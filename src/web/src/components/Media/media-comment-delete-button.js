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

function MediaCommentDeleteButton (props) {
  const [mutate] = useMutation(DELETE_COMMENT);

  const variables = {
    commentId: props.commentId
  };

  // TODO: useEffect를 사용하여 page reload가 아닌 component update로 수정하기.
  const handleDelete = () => {
    mutate({ variables: variables }).then(() => {
      message.info('삭제되었습니다.');
      window.location.reload(false);
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
          left: '95%',
          top: '1.5%'
        }}
      />
    </Popconfirm>
  );
}

export default MediaCommentDeleteButton;