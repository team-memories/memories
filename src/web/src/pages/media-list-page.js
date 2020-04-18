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
  let year = ''
  if (query.get('title') !== null) {
    title = query.get('title')
    location = query.get('location')
    year = query.get('year')
  }
  return (
    <MediaList
      title={title}
      location={location}
      year={year}
    />
  )
}

export default MediaListPage