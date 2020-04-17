import React, { useState } from 'react'
import { Form } from 'antd'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import UploadPageTitle from '../components/UploadPage/upload-page-title'
import UploadDateSelect from '../components/UploadPage/upload-date-select'
import UploadPlaceSelect from '../components/UploadPage/upload-place-select'
import UploadSubmitButton from '../components/UploadPage/upload-submit-button'
import UploadPageDescription from '../components/UploadPage/upload-description'
import DropzoneBox from '../components/UploadPage/dropzone-box'

const UPLOAD_MEDIA = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $date: Date!) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            date: $date
        ) {
            title
            location
            date
        }
    }
`

function UploadPage () {
  const { useMutation } = require('@apollo/react-hooks')
  const [media, setMedia] = useState([])
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('대한민국')
  const [date, setDate] = useState('')
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

  const onDateChange = (date, dateString) => {
    setDate(dateString)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = () => {
    mutate({ variables: { media, title, location, date } }).then(() => {
      alert('Submit!')
      history.push('/')
    })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <Form>
        <DropzoneBox onChange={onMediaChange} mediaName={media.name}/>
        <UploadPageTitle title={title} onChange={onTitleChange}/>
        <UploadPlaceSelect location={location} onChange={onLocationChange}/>
        <UploadDateSelect date={date} onChange={onDateChange}/>
        <UploadPageDescription description={description} onChange={onDescriptionChange}/>
        <UploadSubmitButton onClick={handleSubmit}/>

      </Form>
    </div>
  )
}

export default UploadPage
