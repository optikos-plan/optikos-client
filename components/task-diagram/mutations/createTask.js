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
      <RaisedButton label="ADD A TASK"  onClick={ async () => {
      let { data } = await setTask({
        variables: {
          projectId: 1,
          userId: 1,
          title: "Default Task"
        }
      })
      data = data.createTask
      const task = {
        id: data.id,
        title: data.title,
        status: data.status,
        endDate: data.endDate,
        children: data.children,
        project: data.project,
        user: data.user,
        parents: data.parents
      }

      props.createTask(task)


    } } />
    )}
    </Mutation>
  )
}

export default createTask
