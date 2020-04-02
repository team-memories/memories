import React, {Component} from 'react';
import MediaDetailCard from '../components/media-detail-card'

class MediaDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fakeData = {
      id : 0,
      title: 'title',
      location: '충북 청주시',
      date: '1998년',
      user : {
        profileImgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
      },
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    };
    return(
      <div>
        <MediaDetailCard media={fakeData}/>
      </div>
    );
  }

}

export default MediaDetailPage;
