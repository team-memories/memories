import React, { Component } from 'react'
import { Avatar, List, Typography } from 'antd'
import MediaDetailDeleteButton from './media-detail-delete-button'
import ImageCompare from './media-detail-card-image-compare'

class MediaDetailCard extends Component {
  MediaInfo = () => {
    return (
      <List>
        <List.Item
          actions={[<MediaDetailDeleteButton mediaId={this.props.media.id}/>]}
        >
          <List.Item.Meta
            avatar={<Avatar size={50} src={this.props.media.author.profileImgUrl}/>}
            title={this.props.media.title}
            description={this.props.media.author.name}
            style={{ textAlign: 'left' }}
          />
          <Typography>{this.props.media.location}<br/>{this.props.media.year}</Typography>

        </List.Item>
        <List.Item>
          {this.props.media.description}
        </List.Item>
      </List>
    )
  }

  render () {
    return (
      <div>
        <ImageCompare url={this.props.media.url} originalUrl={this.props.media.originalUrl}/>
        <this.MediaInfo/>
      </div>
    )
  }

}

export default MediaDetailCard
