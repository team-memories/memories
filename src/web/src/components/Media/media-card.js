import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card } from 'antd'

function MediaCard(props){
  const id = useState(props.id)
  const url = useState([props.url])
  const profileImgUrl = useState([props.author.profileImgUrl])
  const title = useState([props.title])
  const location = useState([props.location])
  const year = useState(props.year)
  const name = useState([props.author.name])
  
  return (
    <Link to={`/watch?id=${id}`}>
      <Card
        style={{ height: '95%', borderRadius: 10 }}
        bordered={true}
        cover={<img style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                    src={url} alt="thumbnail"/>}
      >
        <Card.Meta
          avatar={
            <Avatar size={40} src={profileImgUrl} shape="circle"/>
          }
          description={
            <div style={{
              display: 'inline-block',
              maxWidth: '100%',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marinTop: 10,
              marginBottom: 10
            }}>
            <span style={{
              fontWeight: 'bold',
              fontSize: '1.5em',
              color: 'black',
            }}>
              {title}
            </span>
              <br/>
              {name}
              <br/>
              {year} / {location}
            </div>
          }
        />
      </Card>
    </Link>
  )
}

export default MediaCard