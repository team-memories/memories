import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import MediaDetailCard from './media-detail-card';
import {Spin} from 'antd'
import ErrorView from './error-view'

// media의 정보를 가져오는 graphql 쿼리
const GET_MEDIA = gql`
  query ($mediaId: ID!){
      media(_id: $mediaId){
          id,
          title,
          url,
          location,
          date,
          description,
          author{
              name,
              profileImgUrl
          }
      }
  }
`;

// mediaId를 받아서 서버에 쿼리를 보냄.
// 받아온 media 정보를 MediaDetailCard에 props로 전달함.
// @param props.mediaId : 서버에 요청할 미디어의 Id
function MediaDetailCardQuery(props) {
  const {loading, error, data} = useQuery(GET_MEDIA, {
      variables: {mediaId: props.mediaId},
      errorPolicy: 'all'
    }
  );

  if (loading) return (<Spin tip="Loading..." />);
  // TODO(Lhyejin): 자세히 에러 처리 해주기
  if (error){
    console.log(error.graphQLErrors);
    console.log(error.networkError);
    return (<ErrorView />)
  }
  else
    return (
      <MediaDetailCard media={data.media}/>
    );
}

export default MediaDetailCardQuery;
