import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import nameToInitial from '../../utils/nameToInitial'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

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
  }

  handleChange(_, __, value, setOwner) {
    const { handleChange, team, task } = this.props
    this.setState({ value })
    setOwner({ variables: { id: task.id, user: value } })
    handleChange()
  }

  render() {
    const { team } = this.props

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
          </SelectField>
        )}
      </Mutation>
    )
  }
}
