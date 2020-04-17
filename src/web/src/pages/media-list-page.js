import React from 'react'
import { useLocation } from 'react-router-dom'
import MediaList from '../components/Media/media-list'

function useQueryParam () {
  return new URLSearchParams(useLocation().search)
}

function MediaListPage (props) {
  let query = useQueryParam()
  let title = ''
  let location = ''
  let dateFrom = ''
  let dateTo = ''
  if (query.get('title') !== null) {
    title = query.get('title')
    location = query.get('location')
    dateFrom = query.get('dateFrom')
    dateTo = query.get('dateTo')
  }
  return (
    <MediaList
      title={title}
      location={location}
      dateFrom={dateFrom}
      dateTo={dateTo}
    />
  )
}

export default MediaListPage