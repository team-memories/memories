import React from 'react';
import { Avatar, List, Typography, Divider } from 'antd';
import MediaDetailDeleteButton from './media-detail-delete-button';
import ImageCompare from './media-detail-card-image-compare';
import MediaAddComment from './media-add-comment';
import MediaCommentQuery from './media-comment-query';

function MediaInfo (props) {
  return (
    <div>
      <List>
        <List.Item
          actions={[<MediaDetailDeleteButton mediaId={props.media.id} key={props.media.id}/>]}
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
      <Divider/>
    </div>
  );
}

function MediaDetailCard (props) {
  return (
    <div>
      {/* slider */}
      <ImageCompare url={props.media.url} originalUrl={props.media.originalUrl}/>
      {/* 상세 정보 */}
      <MediaInfo media={props.media}/>
      {/* 댓글 추가 */}
      <MediaAddComment mediaId={props.media.id}/>
      {/* 기존의 댓글들 */}
      <MediaCommentQuery mediaId={props.media.id}/>
    </div>
  );
}

export default MediaDetailCard;
