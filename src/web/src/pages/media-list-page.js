import React from 'react'
import { useLocation } from 'react-router-dom'
import MediaList from '../components/Media/media-list'

function useQueryParam () {
  return new URLSearchParams(useLocation().search)
}

function MediaListPage () {
  let query = useQueryParam()
  let title = ''
  let location = ''
  let yearFrom = 1900
  let yearTo = 2099
  if (query.get('title') !== null) {
    title = query.get('title')
    location = query.get('location')
    yearFrom = parseInt(query.get('yearFrom'))
    yearTo = parseInt(query.get('yearTo'))
  }
  return (
    <MediaList
      title={title}
      location={location}
      yearFrom={yearFrom}
      yearTo={yearTo}
    />
  )
}

export default MediaListPage