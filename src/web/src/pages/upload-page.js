import React, { useState } from 'react'
import { Form } from 'antd'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import UploadPageTitle from '../components/UploadPage/upload-page-title'
import UploadYearSelect from '../components/UploadPage/upload-year-select'
import UploadPlaceSelect from '../components/UploadPage/upload-place-select'
import UploadSubmitButton from '../components/UploadPage/upload-submit-button'
import UploadPageDescription from '../components/UploadPage/upload-description'
import DropzoneBox from '../components/UploadPage/dropzone-box'

const UPLOAD_MEDIA = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $year: Int!) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            year: $year
        ) {
            title
            location
            year
        }
    }
`

function UploadPage () {
  const { useMutation } = require('@apollo/react-hooks')
  const [media, setMedia] = useState([])
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('대한민국')
  const [year, setYear] = useState(new Date().getFullYear())
  const [description, setDescription] = useState('')
  const [mutate] = useMutation(UPLOAD_MEDIA)
  const history = useHistory()

  const onMediaChange = (e) => {
    setMedia(e[0])
  }

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const onLocationChange = (e) => {
    setLocation(e.join(' '))
  }

  const onYearChange = (year, yearString) => {
    setYear(parseInt(yearString))
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = () => {
    mutate({ variables: { media, title, location, year } }).then(() => {
      alert('Submit!')
      history.push('/')
    })
  }

  return (
    <div style={{ maxWidth: '750px', margin: '4.5rem auto' }}>
      <Form>
        <DropzoneBox onChange={onMediaChange} mediaName={media.name}/>
        <UploadPageTitle title={title} onChange={onTitleChange}/>
        <UploadPlaceSelect location={location} onChange={onLocationChange}/>
        <UploadYearSelect year={year} onChange={onYearChange}/>
        <UploadPageDescription description={description} onChange={onDescriptionChange}/>
        <UploadSubmitButton onClick={handleSubmit}/>
      </Form>
    </div>
  )
}

export default UploadPage
