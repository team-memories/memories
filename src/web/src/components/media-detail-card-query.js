import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';
import MediaDetailCard from './media-detail-card';


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
  const history = useHistory();
  const {loading, error, data} = useQuery(GET_MEDIA, {
    variables: {mediaId:props.mediaId},
  });
  if (loading) return 'loading';
  // error가 난다면 전 페이지로 redirect
  if (error) return history.goBack();
  return (
    <MediaDetailCard media={data.media}/>
  );

}

export default MediaDetailCardQuery;
