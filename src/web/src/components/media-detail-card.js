import React, {Component} from 'react';
import {List, Avatar, Typography} from 'antd';
import MediaDetailDeleteButton from './media-detail-delete-button'

class MediaDetailCard extends Component {
  // Media Information Component
  MediaInfo = () => {
    return(
      <List>
        <List.Item
          actions={[<MediaDetailDeleteButton mediaId={this.props.media.id} />]}
        >
          <List.Item.Meta
            avatar={<Avatar size={50} src={this.props.media.author.profileImgUrl}/>}
            title={this.props.media.title}
            description={this.props.media.author.name}
            style={{textAlign:'left'}}
          />
          <Typography>{this.props.media.location}<br/>{this.props.media.date}</Typography>

        </List.Item>
        <List.Item>
          {this.props.media.description}
        </List.Item>
      </List>
    )
  }

  // Render of Media Detail Card
  render() {
    return (
      <div>
        <video style={{width: '100%', height: '80%'}} src={this.props.media.url} controls />
        <this.MediaInfo />
      </div>
    );
  }

}

export default MediaDetailCard;
