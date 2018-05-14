import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'

const mutationCreateTask = gql`
  mutation createTask($projectId: ID!, $userId: ID!, $title: String!) {
    createTask(projectId: $projectId, userId: $userId, title: $title) {
      id,
      title
    }
  }
`

const createTask = (props) => {
  return (
    <Mutation mutation={mutationCreateTask}>
    {setTask => (
      <RaisedButton onClick={ async () => {
      const { data } = await setTask({
        variables: {
          projectId: 1,
          userId: 1,
          title: "Default Task"
        }
      })
      console.log("creating new task...", data.createTask)
     props.checkprops(data.createTask)
    
    }}>Add Task</RaisedButton>
    )} 
    </Mutation>
  )
}

export default createTask
