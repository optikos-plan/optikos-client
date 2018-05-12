import React from 'react'
import { List, ListItem } from 'material-ui/List'
import nameToInitial from '../../utils/nameToInitial'

import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

const queryAllUsers = gql`
  {
    users {
      id
      name
    }
  }
`

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

const NodeAssigneeList = props => {
  const { deltaAssignee, node } = props

  return (
    <Query query={queryAllUsers}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        const { users: team } = data

        return (
          <List
            style={{
              width: '100%'
            }}>
            {team.map(member => {
              return (
                <ListItemMutation
                  deltaAssignee={deltaAssignee}
                  member={member}
                  node={node}
                  key={member.id}
                />
              )
            })}
          </List>
        )
      }}
    </Query>
  )
}

export default NodeAssigneeList
