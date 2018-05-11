import React from 'react'
import { List, ListItem } from 'material-ui/List'
import nameToInitial from '../../utils/nameToInitial'
import axios from 'axios'

// TODO: get team from database, input as props

// const team = [
//   {id: 1, name: 'Benito Suriano'},
//   {id: 2, name: 'Amal Sudama'},
//   {id: 3, name: 'Horacio Gutiérrez'},
//   {id: 4, name: 'Jason Yang'},
// ]

export default class NodeAssigneeList extends React.Component {
  constructor() {
    super()
    this.state = {
      team: []
    }
  }

  async componentDidMount() {
    // TODO: change to online server
    const { data } = await axios.get(`http://localhost:3000/api/users`)

    this.setState({
      team: data
    })
  }

  render() {
    const { changeAssignee } = this.props
    const { team } = this.state
    return (
      <List
        style={{
          width: '100%'
        }}
      >
        {team.map(member => {
          return (
            <ListItem
              onClick={event => changeAssignee(event, member)}
              primaryText={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  <h1
                    style={{
                      width: '10%'
                    }}
                  >
                    {nameToInitial(member.name)}
                  </h1>
                  <h3>{member.name}</h3>
                </div>
              }
              key={member.id}
            />
          )
        })}
      </List>
    )
  }
}
