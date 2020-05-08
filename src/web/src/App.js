import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import Header from './components/Header/header'
import MediaListPage from './pages/media-list-page'
import MediaViewPage from './pages/media-view-page'
import UploadPage from './pages/upload-page'
import HomePage from './pages/home-page'
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'
import 'antd/dist/antd.css'
import { setContext } from 'apollo-link-context'

const URI = 'http://15.164.244.125:4000/'

const httpLink = createUploadLink({
  uri: URI
})

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

function App () {
  const [isMediaView, setIsMediaView] = useState(false)
  const onChangeIsMediaView = (bool) => {
    setIsMediaView(bool)
  }
  const [client, setClient] = useState(new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  }))

  //로그인하고 나서 client header 다시 설정
  const getToken = () => {
    const authLink = setContext((_, { headers }) => {
      const token = sessionStorage.getItem('token')
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })
    setClient(new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    }))
  }
  
  return (
    <ApolloProvider client={client}>
      {(!isMediaView) ? <Header/> : ""}
      <Switch>
        <Route exact path="/" render={()=> <HomePage onChangeIsMediaView={onChangeIsMediaView}/>}/>
        <Route exact path="/search" render={()=> <MediaListPage onChangeIsMediaView={onChangeIsMediaView}/>}/>
        <Route exact path="/watch" render={()=> <MediaViewPage onChangeIsMediaView={onChangeIsMediaView}/>}/>
        <Route exact path="/upload" render={()=> <UploadPage onChangeIsMediaView={onChangeIsMediaView}/>}/>
        <Route exact path="/login" render={()=> <LoginPage getToken={getToken} onChangeIsMediaView={onChangeIsMediaView}/>}/>
        <Route exact path="/register" render={()=> <RegisterPage onChangeIsMediaView={onChangeIsMediaView}/>}/>
      </Switch>
    </ApolloProvider>
  )
}

export default App
