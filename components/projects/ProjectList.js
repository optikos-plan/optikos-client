import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Card,
  CardTitle,
  CardActions,
  CardHeader,
  CardText
} from 'material-ui/Card'
import Status from './StatusStepper'
import FlatButton from 'material-ui/FlatButton'

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
          <Card key={project.id}>
            <CardTitle
              title={project.title}
              subtitle={`Assigned to: ${project.owner.name}`}
              actAsExpander={true}
              showExpandableButton={true}
            />
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
