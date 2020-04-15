import React from 'react'
import gql from 'graphql-tag'
import { Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import MediaCard from '../components/MediaList/MediaCard'

function useQueryParm() {
  return new URLSearchParams(useLocation().search)
}

const SearchQuery = gql `
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

function MediaListPage (props) {
  let query = useQueryParm()
  let title = ''
  let location = ''
  let dateFrom = ''
  let dateTo = ''
  if (query.get('title') !== null) {
    title = query.get("title")
    location = query.get("location")
    dateFrom = query.get("dateFrom")
    dateTo = query.get("dateTo")
  }
  const {loading, error, data} = useQuery(SearchQuery, {
    variables: {
      title: title,
      location: location,
      dateFrom: dateFrom,
      dateTo: dateTo
    },
    errorPolicy: 'all'
  });
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (data.search.length === 0) return <div>찾은 결과가 없습니다.</div>
  return (
    <div style={{width: '85%', margin: '3rem auto'}}>
      <Row gutter={[32,16]}>
        {data.search.filter(media => media !== null).map(media => {
          let temp_media = {
            ...media,
            title : (media.title) ? media.title : "",
            location : (media.location) ? media.location : "대한민국",
            date : (media.date) ? media.date : "",
            author : (media.author) ? media.author : {name: "Unknown", profileImgUrl: ""},
          }
          temp_media.author.name = (temp_media.author.name) ? temp_media.author.name : "Unknown"
          temp_media.author.profileImgUrl = (temp_media.author.profileImgUrl) ? temp_media.author.profileImgUrl : ""
          return (
            <Col xs={24} md={12} lg={8} xl={6} key={temp_media.id}>
              <MediaCard title={temp_media.title} location={temp_media.location} date={temp_media.date} author={temp_media.author} id={temp_media.id}/>
            </Col>
          )
        }
      )}
      </Row>
    </div>
  )
}

export default MediaListPage