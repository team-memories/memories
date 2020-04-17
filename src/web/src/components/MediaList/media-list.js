import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Col, Row } from 'antd'
import MediaCard from './MediaCard'
import gql from 'graphql-tag'

const SearchQuery = gql`
  query searchItems($title: String!, $location: String!, $dateFrom: Date, $dateTo: Date) {
    search(title: $title, location: $location, dateFrom: $dateFrom, dateTo: $dateTo) {
      author{
        name
        profileImgUrl
      }
      date
      id
      location
      title
      url
    }
  }
`

function MediaList (props) {
  const { loading, error, data } = useQuery(SearchQuery, {
    variables: {
      title: props.title,
      location: props.location,
      dateFrom: props.dateFrom,
      dateTo: props.dateTo
    },
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  })
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (data.search.length === 0) return <div>찾은 결과가 없습니다.</div>
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Row gutter={[32, 16]}>
        {data.search.filter(media => media !== null).map(media => {
            let temp_media = {
              ...media,
              title: (media.title) ? media.title : '',
              location: (media.location) ? media.location : '대한민국',
              date: (media.date) ? media.date : '',
              author: (media.author) ? media.author : { name: 'Unknown', profileImgUrl: '' },
            }
            temp_media.author.name = (temp_media.author.name) ? temp_media.author.name : 'Unknown'
            temp_media.author.profileImgUrl = (temp_media.author.profileImgUrl) ? temp_media.author.profileImgUrl : ''
            return (
              <Col xs={24} md={12} lg={8} xl={6} key={temp_media.id}>
                <MediaCard title={temp_media.title} location={temp_media.location} date={temp_media.date}
                           author={temp_media.author} id={temp_media.id}/>
              </Col>
            )
          }
        )}
      </Row>
    </div>
  )
}

export default MediaList