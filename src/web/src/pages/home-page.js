import React from 'react'
import ServiceIntro from '../components/Media/service-intro'
import MediaList from '../components/Media/media-list'

function HomePage () {
  let title = '청계천'
  let location = '서울특별시'
  let yearFrom = 1990
  let yearTo = 2020
  return (
    <div>
      <ServiceIntro
        location={location}
        yearFrom={yearFrom}
        yearTo={yearTo}
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