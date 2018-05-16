import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import nameToInitial from '../../utils/nameToInitial'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import ListItemMutation from './mutations/listItemMutation'

const mutationUpdateTaskOwner = gql`
  mutation setOwner($id: ID!, $user: ID!) {
    updateTaskOwner(id: $id, user: $user) {
      id
    }
  }
`

export default class MySelectField extends Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      value: +this.props.user.id
    })
    // console.log(this.state)
  }

  handleChange(_, __, value, setOwner) {
    const { node, deltaAssignee, team } = this.props
    this.setState({ value })
    setOwner({ variables: { id: node.task.id, user: value } })
    deltaAssignee(
      team.filter(member => {
        console.log('Comparison: ', member.id, value)
        return +member.id === value
      })[0]
    )
  }

  render() {
    const { team } = this.props
    const styles = {
      customWidth: {
        width: 150
      }
    }

    const primaryText = ({ name }) => (
      <div
        className="listPrimaryText"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <h1
          style={{
            width: '10%'
          }}
        >
          {nameToInitial(name)}
        </h1>
        <h3>{name}</h3>
      </div>
    )

    return (
      <Mutation mutation={mutationUpdateTaskOwner}>
        {setOwner => (
          <SelectField
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
            className="selectField"
            value={this.state.value}
            onChange={(event, key, value) => {
              this.handleChange(event, key, value, setOwner)
            }}
          >
            {team.map(member => (
              <MenuItem
                key={+member.id}
                value={+member.id}
                primaryText={primaryText(member)}
              />
            ))}
            {/* {team.map(member => {
              return (
              <ListItemMutation
                deltaAssignee={deltaAssignee}
                member={member}
                node={node}
                key={member.id}
                handleChange={this.handleChange}
              />
            )})} */}
          </SelectField>
        )}
      </Mutation>
    )
  }
}
