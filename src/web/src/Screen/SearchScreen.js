import React from 'react'
import Header from '../components/Header'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const SearchQuery = gql `
  query searchItems($title: String!, $location: String!) {
    search(title: $title, location: $location) {
      title
      location
    }
  }
`

const SearchScreen = ({match}) => {
    return (
        <div>
            <Header/>
            <Query
              query={SearchQuery}
              variables={{
                title: match.params.title,
                location: match.params.location
              }}
            >
              {({loading, error, data}) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error: {error.message}</div>
                if (data.search.length === 0) return <div>찾은 결과가 없습니다.</div>
                return (
                  <div>
                    {
                      data.search.map(({title, location}) => {
                        return (
                          <div>
                            {title}
                            {location}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }}
            </Query>
        </div>
    )
}

export default SearchScreen