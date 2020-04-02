import React, {Component} from 'react';
import {Col, List, Avatar, Button, Skeleton} from 'antd';
import MediaDetailDeleteButton from './media-detail-delete-button'

class MediaDetailCard extends Component {
  // MediaDetailCard constructor
  constructor(props) {
    super(props);
  }

  // Media Information Component
  MediaInfo = () => {
    return(
      <List>
        <List.Item
          actions={[<MediaDetailDeleteButton mediaId={this.props.media.id} />]}
        >
          <List.Item.Meta
            avatar={<Avatar size={50} src={this.props.media.user.profileImgUrl}/>}
            title={this.props.media.title}
            description={this.props.media.location}
            style={{textAlign:'left'}}
          />
          <div>{this.props.media.date}</div>
        </List.Item>
        </List>
    )
  }

  // Render of Media Detail Card
  render() {
    return (
      <div>
          <Col xs={24}>
            <div style={{width: '80%', padding: '3rem 4rem'}}>
              <video style={{width: '100%', height: '80%'}} src={this.props.media.url} controls />
              <this.MediaInfo />
            </div>
          </Col>
      </div>
    );
  }

}

export default MediaDetailCard;
