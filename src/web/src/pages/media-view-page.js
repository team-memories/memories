import React, {Component} from 'react';
import MediaDetailCardQuery from '../components/media-detail-card-query'
import {withRouter} from 'react-router-dom';
import {Row, Col} from 'antd'

// Media Detail Page
class MediaViewPage extends Component {
  constructor(props) {
    super(props);
  }

  // MediaDetailPage를 보여줌.
  render() {
    // TODO(Lhyejin): list page에서 mediaId 보내는 것이 구현되면 comment 제거
    // const res_mediaId = this.props.location.search;
    const res_mediaId = 1;
    return(
      <Row>
        <Col span={18} style={{padding: '3rem 4rem'}}>
          {/*media를 보여주고, media에 대한 설명을 보여줌.*/}
          <MediaDetailCardQuery mediaId={res_mediaId} />
        </Col>
      </Row>
    );
  }
}

export default withRouter(MediaViewPage);
