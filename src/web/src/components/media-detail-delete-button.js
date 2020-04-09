import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';
import {Button, Popconfirm, message} from 'antd';

// 서버에 삭제를 요청할 graphql mutation 정의
const DELETE_MEDIA = gql`
  mutation deleteMedia($mediaId: ID!){
    deleteMedia(_id: $mediaId){
        title,
        author{
            name
        }
    }
  }
`;

/**
 * Button for Delete media
 * @param {int} props.mediaId : 지울 미디어의 Id
 */
function MediaDetailDeleteButton(props) {
  // withRouter를 hoc에서 사용하기 위해 useHistory를 사용
  const history = useHistory();

  // TODO(Lhyejin): 만약 delete한 미디어가 계속 존재한다면 cache update해주기
  // useMutation을 사용하여 media를 삭제하는 mutation문을 호출한다.
  const [deleteMedia] = useMutation(DELETE_MEDIA, {
    onCompleted({deleteMedia: {title, author}}){
      message.success(`${author.name}의 ${title}가(이) 삭제되었습니다.`);
      history.goBack();
    },
    onError() {
      message.error('삭제를 요청한 미디어가 존재하지 않습니다.');
      history.goBack();
    }
  });

  // 'Yes'를 클릭했을 때, 이벤트 핸들러
  // deleteMedia로 mutation을 호출한다.
  const confirm = (mediaId) => {
    deleteMedia({ variables: { mediaId }})
  };

  // No를 클릭했을 때, 이벤트 핸들러
  const cancel = (e) => {
    message.error('삭제를 취소하였습니다.')
  };
  // delete 버튼 component
  return (
      <Popconfirm
        title="미디어를 삭제하시겠습니까?"
        onConfirm={() => confirm(props.mediaId)}
        onCancel={cancel}
        okText={"Yes"}
        cancelText={"No"}
      >
        <Button>delete</Button>
      </Popconfirm>
  );
}

export default MediaDetailDeleteButton
