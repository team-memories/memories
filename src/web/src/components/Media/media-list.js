import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MediaCard from './media-card';
import gql from 'graphql-tag';

const SearchQuery = gql`
  query searchItems($queryStr: String!, $location: String!, $yearTo: Int, $yearFrom: Int) {
    search(queryStr: $queryStr, location: $location, yearTo: $yearTo, yearFrom: $yearFrom) {
      author{
        id
        name
        profileImgUrl
      }
      year
      isProcessing
      id
      location
      title
      url
    }
  }
`;

function MediaList (props) {
  const { loading, error, data } = useQuery(SearchQuery, {
    variables: {
      queryStr: props.title,
      location: props.location,
      yearFrom: props.yearFrom,
      yearTo: props.yearTo
    },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data.search.length === 0) return <div>찾은 결과가 없습니다.</div>;
  return (
    <div style={{ width: '70%', margin: '3rem auto' }}>
      <Row gutter={[36, 16]}>
        {data.search.filter(media => media !== null).map(media => {
          let temp_media = {
            ...media,
            title: (media.title) ? media.title : '',
            location: (media.location) ? media.location : '대한민국',
            year: (media.year) ? media.year : '',
            author: (media.author) ? media.author : { name: 'Unknown', profileImgUrl: '' },
            isProcessing: (media.isProcessing) ? media.isProcessing : false,
          };
          temp_media.author.name = (temp_media.author.name) ? temp_media.author.name : 'Unknown';
          temp_media.author.profileImgUrl = (temp_media.author.profileImgUrl) ? temp_media.author.profileImgUrl : '';
          if (temp_media.isProcessing === true) return (
            <Col xs={24} md={12} lg={8} xl={8} key={temp_media.id}>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: 'gray' }}/>}>
                <MediaCard title={temp_media.title} location={temp_media.location} year={temp_media.year}
                  author={temp_media.author} id={temp_media.id} url={temp_media.url}/>
              </Spin>
            </Col>
          );
          return (
            <Col xs={24} md={12} lg={8} xl={8} key={temp_media.id}>
              <MediaCard title={temp_media.title} location={temp_media.location} year={temp_media.year}
                author={temp_media.author} id={temp_media.id} url={temp_media.url}/>
            </Col>
          );
        }
        )}
      </Row>
    </div>
  );
}

export default MediaList;