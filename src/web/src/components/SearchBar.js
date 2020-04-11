import React, { useState } from 'react'
import { Row, Col } from 'antd'
import SearchBarInput from './SearchBarInput'
import SearchBarPlaceSelect from './SearchBarPlaceSelect'
import SearchBarSubmitButton from './SearchBarSubmitButton'
import SearchBarYearSelect from './SearchBarYearSelect'
import { useHistory } from 'react-router-dom'

function SearchBar() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const history = useHistory()
  const  onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeLocation = (value) => {
    setLocation(value[0] + " "  + value[1] + " " + value[2])
  }
  const onChangeDate = (value) => {
    setDateFrom(value[0]._d.getFullYear())
    setDateTo(value[1]._d.getFullYear())
  }
  const onPressEnter = () => {
    history.push(`/search?title=${title}&location=${location}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
  }
  return (
    <Row>
      <Col span={10}>
        <SearchBarInput onChangeTitle={onChangeTitle} onPressEnter={onPressEnter}/>
      </Col>
      <Col span={3}>
      < SearchBarPlaceSelect onChangeLocation={onChangeLocation}/>
      </Col>
      <Col span={4}>
        <SearchBarYearSelect onChangeDate={onChangeDate}/>
      </Col>
      <Col span={1}>
        <SearchBarSubmitButton title={title} location={location} dateFrom={dateFrom} dateTo={dateTo}/>
      </Col>
    </Row>
  )
}
export default SearchBar