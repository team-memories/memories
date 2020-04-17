import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Card } from 'antd'

export default class MediaCard extends Component {
  render () {
    return (
      <Link to={`/watch?id=${this.props.id}`}>
        <Card
          style={{ height: '95%', borderRadius: 10 }}
          bordered={true}
          cover={<img style={{ width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                      src={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} alt="thumbnail"/>}
        >
          <Card.Meta
            avatar={
              <Avatar size={40} src={this.props.author.profileImgUrl} shape="circle"/>
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
                            {this.props.title}
              </span>
                <br/>
                {this.props.author.name}
                <br/>
                {this.props.date} / {this.props.location}
              </div>
            }
          />
        </Card>
      </Link>
    )
  }
}