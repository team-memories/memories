/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card } from 'antd';
import './background.css';
import { ColorArray } from '../constants';
import { PlayCircleFilled } from '@ant-design/icons';

function MediaCard (props) {
  const [isHovering, setIsHovering] = useState(false);
  const handleIsHovering = () => {
    setIsHovering(!isHovering);
  };
  return (
    //Link를 통해서 state 전달, props.data는 search query로 부터 나온 결과값 리스트
    <Link to={{ pathname: `/watch`, search: `?id=${props.id}`, state: { data: props.data } }}>
      <figure className="snip1361" onMouseEnter={handleIsHovering} onMouseLeave={handleIsHovering}>
        { //type가 Photo면 url을 카드에, 비디오면 thumbnail을 카드에 나타남
          (props.typename === 'Photo') ?
            <img style={{ width: '100%', borderRadius: 10 }}
              src={props.url} alt="thumbnail"/>
            :
            <div style={{ position: 'relative' }}>
              <img style={{ width: '100%', borderRadius: 10, zIndex: 1 }} src={props.thumbnailUrl}
                alt="thumbnail"/>
              {!!isHovering &&
              <PlayCircleFilled
                style={{
                  color: 'white',
                  position: 'absolute',
                  zIndex: 2,
                  top: '43%',
                  left: '45%',
                  fontSize: '40px',
                }}
              />
              }
            </div>
        }
        <figcaption>
          <Card.Meta
            avatar={
              (props.author.profileImgUrl === '') ?
                <Avatar size={40}
                  style={{ backgroundColor: ColorArray[props.author.id % ColorArray.length] }}>
                  {props.author.name.charAt(0)}
                </Avatar>
                :
                <Avatar size={40} src={props.author.profileImgUrl} shape="circle"/>
            }
            description={
              <div style={{
                display: 'inline-block',
                maxWidth: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                marinTop: 10,
                marginBottom: 10,
                color: 'black'
              }}>
                <span style={{
                  fontWeight: 'bold',
                  fontSize: '1.5em',
                  color: 'black',
                }}>
                  {props.title}
                </span>
                <br/>
                {props.author.name}
                <br/>
                {props.year} / {props.location}
              </div>
            }
          />
        </figcaption>
      </figure>

    </Link>
  );
}

export default MediaCard;
