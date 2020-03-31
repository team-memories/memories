import React, {Component} from 'react';
import MediaDetailCard from '../components/media-detail-card'

class MediaDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <MediaDetailCard />
      </div>
    );
  }

}

export default MediaDetailPage;
