import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin } from 'antd';
import MediaList from '../components/Media/media-list';
import gql from 'graphql-tag';
import UserDeactivateButton from '../components/UserPage/user-deactivate-button';


const MyMediaQuery = gql`
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
  props.onChangeIsMediaView(window.location.pathname === "/watch");
  const { loading, error, data } = useQuery(MyMediaQuery, {errorPolicy: 'all', fetchPolicy: 'cache-and-network'});
  if (loading) return (<Spin tip="Loading..." style={{ paddingTop: "25%", paddingLeft: "47%" }}/>);
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <div style={{ width: '90%', margin: '3rem auto'}}>
        <h1>
          내가 올린 미디어
        </h1>
      </div>
      {
        (data.myMedia.length === 0) ? <div style={{ width: '90%', height: "100%", margin: '3rem auto'}}>업로드한 미디어가 없습니다.</div> : <MediaList data={data.myMedia}/>
      }
      <div style={{width: "90%", margin: "3rem auto"}}>
        <UserDeactivateButton stype={{margin:"3%"}}/>
      </div>
    </div>

  );
}

export default UserPage;
