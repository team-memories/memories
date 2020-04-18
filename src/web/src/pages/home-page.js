import React from 'react'
import ServiceIntro from '../components/Media/service-intro'
import MediaList from '../components/Media/media-list'

function HomePage () {
  let title = ''
  let location = '경기도'
  let yearFrom = 1960
  let yearTo = 1970
  return (
    <div>
      <ServiceIntro
        location={location}
        yearFrom={yearFrom}
      />
      <MediaList
        title={title}
        location={location}
        dateFrom={yearFrom}
        dateTo={yearTo}
      />
    </div>
  )
}

export default HomePage