import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'

const mutationCreateTask = gql`
  mutation createTask($projectId: ID!, $userId: ID!, $title: String! ) {
    createTask(projectId: $projectId, userId: $userId, title: $title) {
      id,
      title,
      status,
      endDate,
      children {
        id
      },
      user {
        id,
        name
      },
      project {
        id
      }
      parents {
        id
      }
  }
}
`

const createTask = (props) => {
  return (
    <Mutation mutation={mutationCreateTask}>
    {setTask => (
      <RaisedButton onClick={ async () => {
      let { data } = await setTask({
        variables: {
          projectId: props.projectId,
          userId: 1,
          title: "Default Task"
        }
      })
      const task = data.createTask

      props.createTask(task)
    
    }}>Add Task</RaisedButton>
    )} 
    </Mutation>
  )
}

export default createTask
