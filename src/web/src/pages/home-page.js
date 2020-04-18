import React from 'react'
import ServiceIntro from '../components/Media/service-intro'
import MediaList from '../components/Media/media-list'

function HomePage () {
  let title = ''
  let location = '경기도'
  let yearFrom = 1990
  let yearTo = 2000
  return (
    <div>
      <ServiceIntro
        location={location}
        yearFrom={yearFrom}
      />
      <MediaList
        title={title}
        location={location}
        yearFrom={yearFrom}
        yearTo={yearTo}
      />
    </div>
  )
}

export default HomePage