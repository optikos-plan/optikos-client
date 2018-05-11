import React from 'react'
import { Route } from 'react-router-dom'
import AllProjects from './projects/AllProjects'
import SingleProject from './projects/SingleProject'
import AllPeople from './people/AllPeople'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Main = ({ data }) => {
  if (data.loading) return <div>Loading...</div>
  if (data.error) return <div>Error...</div>

  const { tasks } = data

  return (
    <div id="main">
      <Route
        path="/projects/:id"
        render={() => <SingleProject tasks={tasks} />}
      />
      <Route exact path="/people" component={AllPeople} />
      <Route exact path="/projects" component={AllProjects} />
      <Route exact path="/" component={AllProjects} />
    </div>
  )
}

const details = gql`
  fragment details on User {
    id
    name
  }
`

const query = gql`
  {
    tasks {
      id
      title
      user {
        ...details
      }
      children {
        id
        title
        user {
          ...details
        }
      }
    }
  }
  ${details}
`

export default graphql(query)(Main)
