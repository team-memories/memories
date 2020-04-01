import React from 'react';
import {Button, Popconfirm, message} from 'antd';

// TODO(Lhyejin): Add useMutation for media delete

// TODO(Lhyejin): Implement Delete Event Handler
// 'Yes' Event Handler When 'Yes' is clicked in MediaDetailDeleteButton
function Confirm(e) {
  message.success('Delete Success')
}

// 'No' Event Handler When 'No' is clicked in MediaDetailDeleteButton
function Cancel(e) {
  message.error('Delete Cancel')
}

/**
 * Button for Delete media
 * @param mediaId : Media Id to delete
 */
function MediaDetailDeleteButton(mediaId) {
  return (
      <Popconfirm
        title="미디어를 삭제하시겠습니까?"
        onConfirm={Confirm}
        onCancel={Cancel}
        okText={"Yes"}
        cancelText={"No"}
      >
      <Button>delete</Button>
      </Popconfirm>
  );
}

export default MediaDetailDeleteButton
