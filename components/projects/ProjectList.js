import React from 'react'
import { NavLink } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Status from './StatusStepper'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const style = {
  margin: 12
}

const ProjectList = props => {
  const { projects, loading, error } = props.data
  if (loading) return <p>Loading...</p>
  console.log(projects)
  if (error) return <p>Error :(</p>

  return (
    <div className="card-display">
      <RaisedButton label="ADD NEW PROJECT" style={style} primary={true} />
      {projects.map(project => {
        return (
          // TODO: what other information must be displayed on card?
          <Card key={project.id}>
            <CardTitle
              title={project.title}
              subtitle={`Assigned to: ${project.owner.name}`}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <NavLink to={`/projects/${project.id}`}>
              <FlatButton label="Go to project page" />
            </NavLink>
            <CardText expandable={true}>
              {/* Stepper showing the status of the project */}
              <Status project={project} />
              <h3>Description:</h3>
              {`${project.description}`}
            </CardText>
          </Card>
        )
      })}
    </div>
  )
}

const queryAllProjects = gql`
  {
    projects {
      tasks {
        id
        title
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

export default graphql(queryAllProjects)(ProjectList)
