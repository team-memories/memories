import React from 'react'
import Header from '../components/Header'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {Row, Col, Card, Avatar} from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SearchQuery = gql `
  query searchItems($title: String!, $location: String!) {
    search(title: $title, location: $location) {
    author{
      name
      profileImgUrl
    }
    date
    id
    location
    title
    url
    }
  }
`
/**
 * mediadetailpage로 id 전달
 * <a href = {url} onClick = {cardclick}>
 */
function cardclick() {
  console.log(this.props.location.state.id);
  return(
    <div>
      <Link to ={{
        pathname : '/' ,
        state : {
            id : this.props.id
        }
      }}>
      </Link>
    </div>
  );
  
}

const SearchScreen = ({match}) => {
    return (
        <div>
            <Header/>
            <Query
              query={SearchQuery}
              variables={{
                title: match.params.title,
                location: match.params.location,
              }}
            >
              {({loading, error, data}) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error: {error.message}</div>
                if (data.search.length === 0) return <div>찾은 결과가 없습니다.</div>
                return (
                  <div style={{width: '85%', margin: '3rem auto'}}>
                    <Row gutter = {[32, 16]}>
                    { data.search.map(({title, location, date, url, author, id}) => {
                        return (
                          <Col lg={6} md={8} xs={24}>
                            <a href = {url} onClick = {cardclick}>
                              <div style = {{postion: 'relative'}}>
                                <img style= {{width : '100%'}} src = {'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'} alt="thumbnail"/>
                              </div>              
                            </a>
                            <Card bordered = {false}>
                            <Meta
                              avatar = {           
                              <Avatar size = {40} src = {author.profileImgUrl} shape = "circle" />
                              }
                              title ={title}
                              description = {author.name}
                            >
                            </Meta>
                            <br/>
                            <p>{date}
                            <br/>
                            {location}</p>
                            </Card>
                          </Col>
                        )
                      })
                    }
                    </Row>
                  </div>
                )
              }}
            </Query>
        </div>
    )
}

export default SearchScreen