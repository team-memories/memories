import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default class SearchBarSubmitButton extends Component {
  render() {
    return (
      <div>
        <Link to={`/search/${this.props.title}/${this.props.location}/${this.props.dateFrom}/${this.props.dateTo}`}>
          <Button>
              Search
          </Button>
        </Link>
      </div>
    )
  }
}
