import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import MediaListPage from './pages/MediaListPage'
import MediaViewPage from './pages/media-view-page'
import Header from './components/Header'
import UploadPage from './pages/UploadPage'
import HomePage from './pages/home-page'
import 'antd/dist/antd.css'

const URI = 'http://localhost:9696/graphql'

function App () {
  const client = new ApolloClient({
    link: createUploadLink({ uri: URI }),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/search" component={MediaListPage}/>
        <Route exact path="/watch" component={MediaViewPage}/>
        <Route exact path="/upload" component={UploadPage}/>
      </Switch>
    </ApolloProvider>
  )
}

export default App
