import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import MediaList from '../components/Media/media-list';
import gql from 'graphql-tag';


const MyMediaQuery = gql`
  query {
    myMedia {
      id
      title
      location
      year
      url
      isProcessing
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data.myMedia.length === 0) return <div>찾은 결과가 없습니다.</div>;
  return (
    <div>
      <div style={{ width: '90%', margin: '3rem auto'}}>
        <h1>
          내가 올린 미디어
        </h1>
      </div>
      <MediaList data={data.myMedia}/>
    </div>
  );
}

export default UserPage;