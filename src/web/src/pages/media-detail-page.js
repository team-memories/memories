import React, {Component} from 'react';
import MediaDetailCardQuery from '../components/media-detail-card-query'
import MediaDetailComment from '../components/media-detail-comment'
import {Row, Col} from 'antd'

// TODO(Lhyejin): mediaId를 넘겨줄 때, MediaDetailCardQuery에
// listpage에서 보내준 mediaId로 전달하기

// Media Detail Page
class MediaDetailPage extends Component {
  constructor(props) {
    super(props);
  }

  // MediaDetailPage를 보여줌.
  render() {
    return(
      <Row>
        <Col span={18} style={{padding: '3rem 4rem'}}>
          {/*media를 보여주고, media에 대한 설명을 보여줌.*/}
          <MediaDetailCardQuery mediaId={1} />
        </Col>
      </Row>
    );
  }
}

export default MediaDetailPage;
