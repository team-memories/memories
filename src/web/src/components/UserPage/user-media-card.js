import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card } from 'antd';
import UserMediaDeleteButton from './user-media-deleteButton';
import { ColorArray } from '../constants';
import { PlayCircleFilled } from '@ant-design/icons';

function MediaCard(props){
  return (
    <Card
      style={{ height: '100%', borderRadius: 10 }}
      bordered={true}
      //유저 이미지 카드에서 카드 전체를 눌러서 detail-view-page로 이동하게 만들면 삭제기능 불가능, 여기서는 이미지만 누를 수 있도록 설정
      cover={(props.typename === 'Photo') ?
        <Link to={{pathname: `/watch`, search: `?id=${props.id}`, state: {data: props.data}}}>
          <img style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={props.url} alt="thumbnail"/>
        </Link>
        :
        <Link to={{pathname: `/watch`, search: `?id=${props.id}`, state: {data: props.data}}}>
          <img style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} src={props.thumbnailUrl} alt="thumbnail"/>
          <PlayCircleFilled
            style={{
              color: 'white',
              position: 'absolute',
              zIndex: 2,
              top: '25%',
              left: '45%',
              fontSize: '40px',
            }}
          />
        </Link>
      }
    >
      <Card.Meta
        avatar={(props.author.profileImgUrl === '') ?
          <Avatar size={40} style={{backgroundColor: ColorArray[props.author.id % ColorArray.length]}}>
            {props.author.name.charAt(0)}
          </Avatar>
          :
          <Avatar size={40} src={props.author.profileImgUrl}/>
        }
        description={
          <div>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5em',
              color: 'black',
              display: 'inline-block',
              maxInlineSize: '70%',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marinTop: 10,
              marginBottom: 10
            }}>
              {props.title}
            </div>
            <UserMediaDeleteButton mediaId={props.id}/>
            <br/>
            {props.author.name}
            <br/>
            {props.year} / {props.location}
          </div>
        }
      />
    </Card>
  );
}

export default MediaCard;
