import React from 'react'
import MediaDetailCardQuery from '../components/Media/media-detail-card-query'
import { useLocation, withRouter } from 'react-router-dom'
import { Col, Row } from 'antd'

function useQueryParm () {
  return new URLSearchParams(useLocation().search)
}

function MediaViewPage () {
  let query = useQueryParm()
  return (
    <Row justify="center" style={{ paddingTop: '3rem' }}>
      <Col span={18}>
        <MediaDetailCardQuery mediaId={query.get('id')}/>
      </Col>
    </Row>
  )
}

export default withRouter(MediaViewPage)
