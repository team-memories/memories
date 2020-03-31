import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Col, List, Avatar, Button, Skeleton} from 'antd';

class MediaDetailCard extends Component {
  // MediaDetailCard constructor
  constructor(props) {
    super(props);
    this.state = {
          avatar : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          user : "이혜진",
          title : 'title',
          place : '충북 청주시',
          time : '1998년',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
  }
  // Video Information Component
  VideoInfo = () => {
    return(
      <List>
        <List.Item
          actions={[<Button>delete</Button>]}
        >
          <List.Item.Meta
            avatar={<Avatar size={50} src={this.state.avatar}/>}
            title={this.state.title}
            description={this.state.place}
            style={{textAlign:'left'}}
          />
          <div>{this.state.time}</div>
        </List.Item>
        </List>
    )
  }

  // Render of Media
  render() {
    return (
      <div>
          <Col xs={24}>
            <div style={{width: '80%', padding: '3rem 4rem'}}>
              <video style={{width: '100%', height: '80%'}} src={this.state.videoUrl} controls />
              <this.VideoInfo />
            </div>
          </Col>
      </div>
    );
  }

}

MediaDetailCard.propTypes = {};
export default MediaDetailCard;
