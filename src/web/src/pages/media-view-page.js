import React, {Component} from 'react';
import MediaDetailCardQuery from '../components/media-detail-card-query'
import {withRouter} from 'react-router-dom';
import {Row, Col} from 'antd'

class MediaViewPage extends Component {
  render() {
    return(
      <Row>
        <Col span={18} style={{padding: '3rem 4rem'}}>
          <MediaDetailCardQuery mediaId={this.props.location.search.split("=")[1]} />
        </Col>
      </Row>
    );
  }
}

export default withRouter(MediaViewPage);
