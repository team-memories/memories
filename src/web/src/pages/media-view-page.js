import React, {useState}from 'react'
import MediaDetailCardQuery from '../components/Media/media-detail-card-query'
import { useLocation, withRouter } from 'react-router-dom'
import { Col, Row } from 'antd'
import Header from '../components/Header/header'

function useQueryParm () {
  return new URLSearchParams(useLocation().search)
}
function MediaViewPage (props) {
  let query = useQueryParm()
  const [onHeader, setHeader] = useState(false)
  const move = (event) => {
    if (event.pageY<250) {
      setHeader(true)
    }
    else {
      setHeader(false)
    }
  }
  props.onChangeIsMediaView(window.location.pathname === "/watch")
  return (
    <div onMouseMove={move}>
      {onHeader ? <Header/> : <div/>}
      <Row justify="center" style={{ paddingTop: '3rem' }}>
        <Col span={18}>
          <MediaDetailCardQuery mediaId={query.get('id')}/>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(MediaViewPage)
