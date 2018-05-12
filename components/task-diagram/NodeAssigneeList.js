import React from 'react'
import { List } from 'material-ui/List'

import ListItemMutation from './mutations/listItemMutation'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const NodeAssigneeList = ({ deltaAssignee, node, data }) => {
  if (data.loading) return <p>Loading...</p>
  if (data.error) return <p>Error :(</p>

  const { users: team } = data

  return (
    <List
      style={{
        width: '100%'
      }}>
      {team.map(member => (
        <ListItemMutation
          deltaAssignee={deltaAssignee}
          member={member}
          node={node}
          key={member.id}
        />
      ))}
    </List>
  )
}

const queryAllUsers = gql`
  {
    users {
      id
      name
    }
  }
`

export default graphql(queryAllUsers)(NodeAssigneeList)
