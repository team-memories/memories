import React from 'react'
import gql from 'graphql-tag'
import { Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import MediaCard from '../components/MediaList/MediaCard'
import ErrorView from '../components/error-view'

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
        {data.search.map(({title, location, date, author, id}) => {
          if (title === null || location === null || date === null || author === null) return <ErrorView key={id}/>
          return (
            <Col lg={6} md={8} xs={24} key={id}>
              <MediaCard title={title} location={location} date={date} author={author} id={id}/>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default MediaListPage