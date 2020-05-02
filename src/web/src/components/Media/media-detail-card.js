import React from 'react'
import { Avatar, List, Typography } from 'antd'
import MediaDetailDeleteButton from './media-detail-delete-button'
import ImageCompare from './media-detail-card-image-compare'

function MediaInfo (props) {
  return (
    <List>
      <List.Item
        actions={[<MediaDetailDeleteButton mediaId={props.media.id}/>]}
      >
        <List.Item.Meta
          avatar={<Avatar size={50} src={props.media.author.profileImgUrl}/>}
          title={props.media.title}
          description={props.media.author.name}
          style={{ textAlign: 'left' }}
        />
        <Typography>{props.media.location}<br/>{props.media.year}</Typography>

      </List.Item>
      <List.Item>
        {props.media.description}
      </List.Item>
    </List>
  )
}

function MediaDetailCard (props) {
  return (
    <div>
      <ImageCompare url={props.media.url} originalUrl={props.media.originalUrl}/>
      <MediaInfo media={props.media}/>
    </div>
  )
}

export default MediaDetailCard
