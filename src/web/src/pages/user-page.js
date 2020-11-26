import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Descriptions, Layout, Spin } from 'antd';
import MediaList from '../components/Media/media-list';
import gql from 'graphql-tag';
import { ColorArray } from '../components/constants';
import { EditOutlined } from '@ant-design/icons';
import UserEditButton from '../components/UserPage/user-edit-button';

const MY_MEDIA = gql`
  query {
    myMedia {
      id
      title
      location
      year
      url
      underProcessing
      author {
        name
        profileImgUrl
        id
      }
      thumbnailUrl
    }
  }
`;

function UserPage (props) {
  props.onChangeIsMediaView(window.location.pathname === '/watch');
  const { loading, error, data } = useQuery(MY_MEDIA, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  });
  if (loading) return (<Spin tip="Loading..." style={{ paddingTop: '25%', paddingLeft: '47%' }}/>);
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h2 style={{ fontSize: 25, fontWeight: 500, width: '90%', margin: '5rem auto 3rem auto' }}>
        마이페이지
      </h2>
      {/* 사용자 정보 */}
      <Layout style={{ background: '#fff' }}>
        <Layout.Sider theme="light" style={{ paddingLeft: '8rem', margin: 'auto 0' }}>
          {
            sessionStorage.getItem('user_profileImgUrl') === 'null' ?
              <Avatar size={80}
                style={{ backgroundColor: ColorArray[sessionStorage.getItem('user_id') % ColorArray.length] }}>
                {sessionStorage.getItem('user_name').charAt(0)}
              </Avatar>
              :
              <Avatar size={80} src={sessionStorage.getItem('user_profileImgUrl')} shape="circle"/>
          }
        </Layout.Sider>
        <Layout style={{ background: '#fff' }}>
          <Layout.Content>
            <Descriptions bordered column={1} style={{ margin: 'auto 4.5rem' }}>
              <Descriptions.Item
                label="이름">{sessionStorage.getItem('user_name')}</Descriptions.Item>
              <Descriptions.Item
                label="이메일">{sessionStorage.getItem('user_email')}</Descriptions.Item>
            </Descriptions>
          </Layout.Content>
        </Layout>
      </Layout>
      {/* 회원 정보 수정 */}
      <div style={{ width: '90%', margin: '2% 3% 3% 3%' }}>
        <UserEditButton/>
      </div>
      {/* 내 게시글 */}
      <h2 style={{ fontSize: 18, fontWeight: 500, width: '90%', margin: '5rem auto 2rem auto' }}>
        <EditOutlined style={{ paddingRight: 10 }}/>내 게시글
      </h2>
      {
        (data.myMedia.length === 0) ?
          <div style={{ width: '90%', height: '100%', margin: '3rem auto' }}>업로드한 미디어가 없습니다.</div>
          :
          <MediaList data={data.myMedia}/>
      }
    </div>

  );
}

export default UserPage;
