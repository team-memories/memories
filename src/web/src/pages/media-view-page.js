import React, {useState}from 'react'
import MediaDetailCardQuery from '../components/Media/media-detail-card-query'
import { useLocation, withRouter } from 'react-router-dom'
import { Col, Row, Button } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
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
  const findIndex = (element) => {
    return element.id === query.get('id')
  }
  props.onChangeIsMediaView(window.location.pathname === "/watch")
  const data = props.location.state.data
  const index = data.findIndex(findIndex)
  let previous_index = index - 1
  let next_index = index + 1
  if (index === 0) previous_index = data.length - 1
  if (index === (data.length-1)) next_index = 0
  return (
    <div onMouseMove={move}>
      {onHeader ? <Header/> : <div/>}
      <Row justify="center" style={{ paddingTop: '3rem' }}>
        <Col span={2} style={{paddingTop: '20rem', paddingLeft: '2rem'}}>
          <Link to={{pathname: `/watch`, search: `?id=${data[previous_index].id}`, state: {data: data}}}>
            <Button shape="circle" icon={<ArrowLeftOutlined style={{fontSize: 30}}/>} size="large"/>
          </Link>
        </Col>
        <Col span={19}>
          <MediaDetailCardQuery mediaId={query.get('id')}/>
        </Col>
        <Col span={2} style={{paddingTop: '20rem', paddingLeft: '4.2rem'}}>
        <Link to={{pathname: `/watch`, search: `?id=${data[next_index].id}`, state: {data: data}}}>
            <Button shape="circle" icon={<ArrowRightOutlined style={{fontSize: 30}}/>} size="large"/>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(MediaViewPage)
