import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar } from 'antd'

export default class MediaCard extends Component {
  render() {
    return (
      <Link to={`/watch?id=${this.props.id}`}>   
        <Card
          style = {{height : '95%'}}
          bordered={true}
          cover={<img style={{width : '100%'}} src={'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} alt="thumbnail"/>}
        >
          <Card.Meta
            avatar = {           
            <Avatar size={40} src={this.props.author.profileImgUrl} shape="circle" />
            }
            title={this.props.title}
            description={
            <p style={{marginTop: 10}}>
              {this.props.author.name}
              <br/>
              {this.props.date}
              <br/>
              {this.props.location}
            </p>
            }
          />
          
        </Card>
      </Link>
    )
  }
}