import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const mutationChangeStatus = gql`
  mutation updateTaskStatus($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`

const valToStat = (value) => {
  if (value === 1) return "COMPLETED"
  if (value === 2) return "IN_PROGRESS"
  if (value === 3) return "ASSIGNED"
 }

export default class UpdateStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let statToNum = 0
    const { task } = this.props

    if (task.status === 'COMPLETED') {
      statToNum = 1
    } else if (task.status === 'IN_PROGRESS') {
      statToNum = 2
    } else if (task.status === 'ASSIGNED') {
      statToNum = 3
    }

    this.setState({
      value: statToNum
    })
  }

  handleChange(_, __, value, updateTaskStatus) {
    const { handleChange, task } = this.props
    this.setState({ value })
    console.log('Changing value to status: ', valToStat(value))
    updateTaskStatus({ variables: { id: task.id, status: valToStat(value) } })
    handleChange()
  }

  render() {
    return (
      <Mutation mutation={mutationChangeStatus}>
        {updateTaskStatus => (
          <SelectField
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
            value={this.state.value}
            onChange={(event, key, value) =>
              this.handleChange(event, key, value, updateTaskStatus)
            }
          >
            <MenuItem
              value={1}
              primaryText="COMPLETED"
              style={{
                fontSize: '1.5rem'
              }}
            />
            <MenuItem
              value={2}
              primaryText="IN PROGRESS"
              style={{
                fontSize: '1.5rem'
              }}
            />
            <MenuItem
              value={3}
              primaryText="ASSIGNED"
              style={{
                fontSize: '1.5rem'
              }}
            />
          </SelectField>
        )}
      </Mutation>
    )
  }
}
