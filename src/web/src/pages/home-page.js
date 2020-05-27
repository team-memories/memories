import React from 'react';
import ServiceIntro from '../components/Media/service-intro';
import MediaSearchQuery from '../components/Media/media-search-query';

function HomePage (props) {
  let title = '석수동';
  let location = '대한민국';
  let yearFrom = 1970;
  let yearTo = 1980;
  props.onChangeIsMediaView(window.location.pathname === "/watch");
  return (
    <div>
      <ServiceIntro
        title={title}
        location={location}
        yearFrom={yearFrom}
        yearTo={yearTo}
      />
      <MediaSearchQuery
        title={title}
        location={location}
        yearFrom={yearFrom}
        yearTo={yearTo}
      />
    </div>
  );
}

export default HomePage;