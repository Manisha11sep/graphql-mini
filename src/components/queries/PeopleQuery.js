import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_PEOPLE = gql`
  query getPeople {
    people {
      id
      name
      height
      films {
        title
      }
      homeWorld {
        name
      }
    }
  }
`

const PeopleQuery = props => {
  return (
    <Query query={ GET_PEOPLE }>
      {
        (loading, error, data) => {
          // code
        }
      }
    </Query>
  )
}

export default PeopleQuery