import React, {Component} from 'react';
import MediaDetailCardQuery from '../components/media-detail-card-query'
import {withRouter} from 'react-router-dom';
import {Row, Col} from 'antd'

// Media Detail Page
class MediaDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaId: '1',
    }
  }

  // TODO(Lhyejin): mediaId 받을 때, listPage에서 보내준 방식으로 바꾸기
  componentWillMount() {
    const res_mediaId = this.props.location.search;
    if (res_mediaId){
      this.setState({
        mediaId: res_mediaId
      });
    }
  }

  // MediaDetailPage를 보여줌.
  render() {
    return(
      <Row>
        <Col span={18} style={{padding: '3rem 4rem'}}>
          {/*media를 보여주고, media에 대한 설명을 보여줌.*/}
          <MediaDetailCardQuery mediaId={this.state.mediaId} />
        </Col>
      </Row>
    );
  }
}

export default withRouter(MediaDetailPage);
