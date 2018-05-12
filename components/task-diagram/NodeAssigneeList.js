import React from 'react'
import { List } from 'material-ui/List'

import ListItemMutation from './mutations/listItemMutation'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const queryAllUsers = gql`
  {
    users {
      id
      name
    }
  }
`

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
