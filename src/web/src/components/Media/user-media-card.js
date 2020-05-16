import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

function MediaCard(props){
  return (
    <Link to={`/watch?id=${props.id}`}>
      <Card
        style={{ height: '95%', borderRadius: 10 }}
        bordered={true}
        cover={<img style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          src={props.url} alt="thumbnail"/>}
      >
        <Card.Meta
          avatar={
            <Avatar size={40} src={props.author.profileImgUrl} shape="circle"/>
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
              <Button type="link" icon={<DeleteOutlined style={{fontSize: '25px'}}/>} style={{float: "right"}} />
              <br/>
              {props.author.name}
              <br/>
              {props.year} / {props.location}
            </div>
          }
        />
      </Card>
    </Link>
  )
}

export default MediaCard