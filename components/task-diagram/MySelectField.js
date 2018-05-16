import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import nameToInitial from '../../utils/nameToInitial'
import ListItemMutation from './mutations/listItemMutation'

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

  handleChange(_, __, value) {
    this.setState({ value })
  }

  render() {
    const { deltaAssignee, node, team } = this.props
    console.log(this.state)
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
      <SelectField
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
        className="selectField"
        value={this.state.value}
        onChange={this.handleChange}
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
    )
  }
}
