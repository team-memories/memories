import React from 'react'
import ServiceIntro from '../components/service-intro'
import MediaList from '../components/MediaList/media-list'

function HomePage () {
  return (
    <div>
      <ServiceIntro/>
      <MediaList
        title=''
        location = ''
        dateFrom = ''
        dateTo = ''
      />
    </div>
  )
}

export default HomePage