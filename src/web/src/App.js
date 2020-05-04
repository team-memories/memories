import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import MediaListPage from './pages/media-list-page'
import MediaViewPage from './pages/media-view-page'
import UploadPage from './pages/upload-page'
import HomePage from './pages/home-page'
import Header from './components/Header/header'
import 'antd/dist/antd.css'

const URI = 'http://localhost:9696/graphql'

function App () {
  const client = new ApolloClient({
    link: createUploadLink({ uri: URI }),
    cache: new InMemoryCache(),
  })

  const [isMediaView, setIsMediaView] = useState(false)
  const setMediaView = (bool) => {
    setIsMediaView(bool)
  }
  return (
    <ApolloProvider client={client}>
      {(!isMediaView) ? <Header/> : ""}
      <Switch>
        <Route exact path="/" render={()=> <HomePage setMediaView={setMediaView}/>}/>
        <Route exact path="/search" render={()=> <MediaListPage setMediaView={setMediaView}/>}/>
        <Route exact path="/watch" render={()=> <MediaViewPage setMediaView={setMediaView}/>}/>
        <Route exact path="/upload" render={()=> <UploadPage setMediaView={setMediaView}/>}/>
      </Switch>
    </ApolloProvider>
  )
}

export default App
