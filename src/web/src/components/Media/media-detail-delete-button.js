import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';

const DELETE_MEDIA = gql`
  mutation deleteMedia($mediaId: ID!){
    deleteMedia(id: $mediaId){
      title,
      author{
        id
        name
      }
    }
  }
`;

function MediaDetailDeleteButton (props) {
  const history = useHistory();
  const [deleteMedia] = useMutation(DELETE_MEDIA, {
    onCompleted ({ deleteMedia: { title, author } }) {
      message.success(`${author.name}의 ${title}이(가) 삭제되었습니다.`);
      history.goBack();
    },
    onError () {
      message.error('삭제를 요청한 미디어가 존재하지 않습니다.');
      history.goBack();
    }
  });
  const confirm = (mediaId) => {
    deleteMedia({ variables: { mediaId } });
  };
  const cancel = () => {
    message.error('삭제를 취소하였습니다.');
  };
  return (
    <Popconfirm
      title="미디어를 삭제하시겠습니까?"
      onConfirm={() => confirm(props.mediaId)}
      onCancel={cancel}
      okText={'Yes'}
      cancelText={'No'}
    >
      <Button>delete</Button>
    </Popconfirm>
  );
}

export default MediaDetailDeleteButton;
