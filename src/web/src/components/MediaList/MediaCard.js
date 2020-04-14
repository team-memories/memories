import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar} from 'antd'

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
            description={
            <div  style={{marinTop: 10, marginBottom:10}}>
              <span style={{
                            fontWeight:"bold", 
                            fontSize:"1.5em", 
                            color:"black",
                            //반응형 말줄임표 
                            display: 'inline-block',
                            maxWidth: '100%',
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden"
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