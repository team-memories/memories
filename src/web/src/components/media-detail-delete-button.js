import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Popconfirm, message} from 'antd';

// 서버에 삭제를 요청할 graphql mutation문
const DELETE_MEDIA = gql`
  mutation ($mediaId: ID!){
    deleteMedia(_id: $mediaId){
        _id
    }
  }
`
// TODO(Lhyejin): Implement Delete Event Handler, mediaId 가져오기
// 'Yes'를 클릭했을 때, 이벤트 핸들러
function Confirm(mediaId) {
  console.log(mediaId)
  // const [deleteMedia] = useMutation(DELETE_MEDIA);
  message.success('Delete Success')
}

// No를 클릭했을 때, 이벤트 핸들러
function Cancel(e) {
  message.error('Delete Cancel')
}

/**
 * Button for Delete media
 * @param props.mediaId : 지울 미디어의 Id
 */
function MediaDetailDeleteButton(props) {
  return (
      <Popconfirm
        title="미디어를 삭제하시겠습니까?"
        onConfirm={() => Confirm(props.mediaId)}
        onCancel={Cancel}
        okText={"Yes"}
        cancelText={"No"}
      >
        <Button>delete</Button>
      </Popconfirm>
  );
}

export default MediaDetailDeleteButton
