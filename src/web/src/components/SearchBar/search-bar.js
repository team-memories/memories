import React, { useState } from 'react'
import { Col, Row } from 'antd'
import SearchBarInput from './search-bar-input'
import SearchBarPlaceSelect from './search-bar-place-select'
import SearchBarSubmitButton from './search-bar-submit-button'
import SearchBarYearSelect from './search-bar-year-select'
import { useHistory } from 'react-router-dom'

function SearchBar () {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const history = useHistory()
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeLocation = (value) => {
    setLocation(value[0] + ' ' + value[1] + ' ' + value[2])
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
      <Col flex={1}>
        <SearchBarInput onChangeTitle={onChangeTitle} onPressEnter={onPressEnter}/>
      </Col>
      <Col>
        < SearchBarPlaceSelect onChangeLocation={onChangeLocation}/>
      </Col>
      <Col>
        <SearchBarYearSelect onChangeDate={onChangeDate}/>
      </Col>
      <Col>
        <SearchBarSubmitButton title={title} location={location} dateFrom={dateFrom} dateTo={dateTo}/>
      </Col>
    </Row>
  )
}

export default SearchBar