import React, { useState } from 'react'
import { Col, Row } from 'antd'
import SearchBarInput from './search-bar-input'
import SearchBarPlaceSelect from './search-bar-place-select'
import SearchBarSubmitButton from './search-bar-submit-button'
import SearchBarYearSelect from './search-bar-year-select'
import { useHistory } from 'react-router-dom'

function SearchBar () {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('대한민국')
  const [yearFrom, setYearFrom] = useState(new Date().getFullYear())
  const [yearTo, setYearTo] = useState(new Date().getFullYear())
  const history = useHistory()
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeLocation = (value) => {
    setLocation(value.join(' '))
  }
  const onChangeYear = (value) => {
    setYearFrom(value[0]._d.getFullYear())
    setYearTo(value[1]._d.getFullYear())
  }
  const onPressEnter = () => {
    history.push(`/search?title=${title}&location=${location}&yearFrom=${yearFrom}&yearTo=${yearTo}`)
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
        <SearchBarYearSelect onChangeYear={onChangeYear}/>
      </Col>
      <Col>
        <SearchBarSubmitButton title={title} location={location} yearFrom={yearFrom} yearTo={yearTo}/>
      </Col>
    </Row>
  )
}

export default SearchBar