import React from 'react'
import ServiceIntro from '../components/Media/service-intro'
import MediaList from '../components/Media/media-list'

function HomePage () {
  let title = ''
  let location = '경기도'
  let dateFrom = '1960'
  let dateTo = '1970'
  return (
    <div>
      <ServiceIntro
        location={location}
        dateFrom={dateFrom}
      />
      <MediaList
        title={title}
        location={location}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </div>
  )
}

export default HomePage