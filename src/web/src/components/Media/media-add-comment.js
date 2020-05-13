import React, { useState } from 'react';
import { Comment, Avatar, Form, Button, Input, message, Space } from 'antd';

const { TextArea } = Input;

const Editor = ({ onChange, onCancel, onSubmit, submitting, value }) => (
  <div>
    {/* 댓글 입력창 */}
    <Form.Item>
      <TextArea
        rows={1}
        onChange={onChange}
        value={value}
        autoSize={{ minRows: 1, maxRows: 6 }}
        placeholder="댓글을 입력하세요."
        style={{border: "none", borderBottom: "1px solid"}} />
    </Form.Item>

    <Space style={{float: 'right'}}>
      {/* 댓글 취소 버튼 */}
      <Form.Item>
        <Button loading={submitting} onClick={onCancel} style={{border: 'none'}}>
        취소
        </Button>
      </Form.Item>

      {/* submit 버튼 */}
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        댓글
        </Button>
      </Form.Item>
    </Space>
  </div>
);

function MediaAddComment (props) {
  const [commentValue, setCommentValue] = useState('');

  const handleSubmit = () => {
    // 글을 입력하지 않고 댓글 버튼을 누르면 메시지를 띄운다.
    if (!commentValue) {
      message.info('댓글을 작성해주세요.');
    }

    // TODO(sujin) : add comment mutation
  };

  // 취소 버튼을 누르면 작성중이던 댓글이 '' 로 초기화됨
  const handleCancel = () => {
    setCommentValue('');
  };

  // 댓글을 입력하면 입력창에 글자가 보이도록 설정
  const handleChange = e => {
    setCommentValue(e.target.value);
  };

  return (
    <div>
      <Comment
        // 사용자 섬네일 이미지 설정 
        avatar={
          <Avatar
            src={sessionStorage.getItem("user_profileImgUrl")}
          />
        }
        // 댓글 입력
        content={
          <Editor
            onChange={handleChange}  // 댓글을 입력할 때마다 input 에 update 한다.
            onCancel={handleCancel}  // 작성중인 댓글의 내용을 지운다.
            onSubmit={handleSubmit}  // submit mutation 수행
            value={commentValue} // 작성한 댓글의 value
          />
        }
      />
    </div>
  );
}

export default MediaAddComment;