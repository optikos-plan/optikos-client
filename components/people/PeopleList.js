import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const style = {
  margin: 12
}

const items = ['person1', 'person2', 'person3', 'person4', 'person5']

const PeopleList = ({ data }) => {
  if (data.loading) return 'Loading...'
  if (data.error) return <div>OOPsie!</div>
  console.log('data ', data)

  const { users } = data

  return (
    <div className="card-display">
      <RaisedButton label="ADD NEW PERSON" style={style} primary={true} />
      {users.map(user => {
        return (
          <Card key={user.id}>
            <CardHeader
              title={user.name}
              subtitle="Owner of project"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              Description: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla
              facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia
              auctor quam sed pellentesque. Aliquam dui mauris, mattis quis
              lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        )
      })}
    </div>
  )
}

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

export default graphql(GET_USERS)(PeopleList)
