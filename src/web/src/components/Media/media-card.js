/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card } from 'antd'
import './background.css'

function MediaCard(props){
  return (
    //Link를 통해서 state 전달, props.data는 search query로 부터 나온 결과값 리스트
    <Link to={{pathname: `/watch`, search: `?id=${props.id}`, state: {data: props.data}}}>
      <figure className = "snip1361">
        <img style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          src={props.url} alt="thumbnail"/>
        <figcaption>
          <Card.Meta
            avatar={
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
  )
}

export default MediaCard