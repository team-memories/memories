import React from 'react'
import ServiceIntro from '../components/Media/service-intro'
import MediaList from '../components/Media/media-list'
import Header from '../components/Header/header'

function HomePage () {
  let title = '청계천'
  let location = '서울특별시'
  let yearFrom = 1990
  let yearTo = 2020
  return (
    <div>
      <Header/>
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