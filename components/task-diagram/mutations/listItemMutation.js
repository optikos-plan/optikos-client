import React from 'react'
import { ListItem } from 'material-ui/List'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import nameToInitial from '../../../utils/nameToInitial'

const primaryText = ({ name }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
    <h1
      style={{
        width: '10%'
      }}>
      {nameToInitial(name)}
    </h1>
    <h3>{name}</h3>
  </div>
)

const mutationUpdateTaskOwner = gql`
  mutation setOwner($id: ID!, $user: ID!) {
    updateTaskOwner(id: $id, user: $user) {
      id
    }
  }
`

const ListItemMutation = ({ deltaAssignee, member, node }) => {
  return (
    <Mutation mutation={mutationUpdateTaskOwner}>
      {setOwner => (
        <ListItem
          onClick={() => {
            setOwner({ variables: { id: node.task.id, user: member.id } })
            deltaAssignee(member)
          }}
          primaryText={primaryText(member)}
          key={member.id}
        />
      )}
    </Mutation>
  )
}

export default ListItemMutation
