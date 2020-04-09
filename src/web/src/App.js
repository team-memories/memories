import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import 'antd/dist/antd.css'
import HomePage from './pages/HomePage'
import MediaListPage from './pages/MediaListPage'
import MediaViewPage from './pages/media-view-page'
import Header from './components/Header'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      client : new ApolloClient({
        uri: 'http://localhost:9696/graphql'
      })
    }
  }
  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/search" component={MediaListPage}/>
          <Route exact path="/watch" component={MediaViewPage}/>
        </Switch>
      </ApolloProvider>
    )
  }
}