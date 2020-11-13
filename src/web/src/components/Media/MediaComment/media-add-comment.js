import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Comment, Avatar, Form, Button, Input, message, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ColorArray } from '../../constants';

const { TextArea } = Input;

const CREATE_COMMENT = gql`
    mutation ($mediaId: ID!, $content: String!) {
        createComment(
            mediaId: $mediaId
            content: $content
        ) {
            id
            author {
                id
            }
            content
        }
    }
`;

const UserEditor = ({ onChange, onCancel, onSubmit, submitting, value }) => (
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

const GuestEditor = ({onChange, onCancel, value}) => (
  <div>
    {/* 댓글 입력창 */}
    <Form.Item>
      <TextArea
        rows={1}
        onChange={onChange}
        value={value}
        autoSize={{ minRows: 1, maxRows: 6 }}
        placeholder="로그인이 필요한 서비스입니다."
        style={{border: "none", borderBottom: "1px solid"}} />
    </Form.Item>
    <Space style={{float: 'right'}}>
      {/* 댓글 취소 버튼 */}
      <Form.Item>
        <Button onClick={onCancel} style={{border: 'none'}}>
          취소
        </Button>
      </Form.Item>

      {/* submit 버튼 */}
      <Form.Item>
        <Button htmlType="submit" onClick={() => {message.error('로그인이 필요한 서비스입니다.');}} type="primary">
          댓글
        </Button>
      </Form.Item>
    </Space>
  </div>
);

// parent: MediaComment
function MediaAddComment (props) {
  const [commentValue, setCommentValue] = useState('');
  const [mutate] = useMutation(
    CREATE_COMMENT,
    {
      // mutation 보내면 refetching
      refetchQueries: [{
        query: props.GET_COMMENTS, variables: { mediaId: props.mediaId }
      }]
    }
  );

  const handleSubmit = () => {
    // 글을 입력하지 않고 댓글 버튼을 누르면 경고 메시지를 띄운다.
    if (!commentValue) {
      message.info('댓글을 작성해주세요.');
      return;
    }

    const variables = {
      mediaId: props.mediaId,
      content: commentValue,
    };

    // 댓글 등록 mutation
    mutate({ variables: variables }).then(() => {
      message.info('댓글 등록이 완료되었습니다.');
    });

    // 등록을 완료한 댓글의 state 를 ''로 설정
    handleCancel();
  };

  // 취소 버튼을 누르면 작성중이던 댓글이 '' 로 초기화됨
  const handleCancel = () => {
    setCommentValue('');
  };

  // 댓글을 입력하면 입력창에 글자가 보이도록 설정
  const handleChange = e => {
    setCommentValue(e.target.value);
  };

  // 로그인이 되어 있는 경우
  if (sessionStorage.getItem("token")) {
    return (
      <div>
        <div style={{fontWeight: 'bold', fontSize: '18px'}}>댓글</div>
        <Comment
          // 사용자 섬네일 이미지 설정
          avatar={
            sessionStorage.getItem("user_profileImgUrl") === 'null'?
              <Avatar size={35} style={{backgroundColor: ColorArray[sessionStorage.getItem("user_id") % ColorArray.length]}}>
                {sessionStorage.getItem("user_name").charAt(0)}
              </Avatar>
              :
              <Avatar size={35} src={sessionStorage.getItem("user_profileImgUrl")}  shape="circle" />
          }
          // 댓글 입력
          content={
            <UserEditor
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
  // 로그인이 되어 있지 않은 경우
  else {
    return (
      <div>
        <div style={{fontWeight: 'bold', fontSize: '18px'}}>댓글</div>
        <Comment
          // 게스트 섬네일 이미지 설정
          avatar={<Avatar size={35} icon={<UserOutlined/>} style={{backgroundColor:"#82BEE6"}}/>}
          // 댓글 입력
          content={
            <GuestEditor
              onChange={handleChange}
              onCancel={handleCancel}
              value={commentValue}
            />
          }
        />
      </div>
    );
  }
}

export default MediaAddComment;
