import React from 'react'
import MySelectField from './MySelectField'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const NodeAssigneeList = ({ deltaAssignee, node, data, assignee }) => {
  if (data.loading) return <p>Loading...</p>
  if (data.error) return <p>Error :(</p>

  const { users: team } = data
  const user = assignee
  return (
    <MySelectField
      team={team}
      deltaAssignee={deltaAssignee}
      node={node}
      user={user} />
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
