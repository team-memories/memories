import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import MediaList from '../components/Media/media-list'
import gql from 'graphql-tag'


const MyMediaQuery = gql`
  query {
    myMedia {
      id
      title
      location
      year
      url
      isProcessing
      author {
        name
        profileImgUrl
      }
    }
  }
`

function UserPage (props) {
  props.onChangeIsMediaView(window.location.pathname === "/watch")
  const { loading, error, data } = useQuery(MyMediaQuery)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (data.myMedia.length === 0) return <div>찾은 결과가 없습니다.</div>
  return (
    <MediaList data={data.myMedia}/>
  )
}

export default UserPage