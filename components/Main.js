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

  const { projects } = data
  console.log('Projects', projects)

  return (
    <div id="main">
      <Route
        path="/projects/:id"
        render={(routeProps) => <SingleProject routeProps={routeProps} projects={projects} />}
      />
      <Route exact path="/people" component={AllPeople} />
      <Route exact path="/projects" component={AllProjects} />
      <Route exact path="/" component={AllProjects} />
    </div>
  )
}

// TODO: details is currently not used... need further explanation before deleting
const details = gql`
  fragment details on User {
    id
    name
  }
`
// TODO: query was changed so that all projects are retrieved from db... Basically grabs everything; is there a more efficient way?
const query = gql`
  {
    projects {
      tasks {
        id
        title
        endDate
        user {
          id
          name
        }
        children {
          id
          title
          endDate
          user {
            id
            name
          }
        }
      }
      owner {
        id
        name
      }
      id
      status
      title
      description
    }
  }
`

export default graphql(query)(Main)
