import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import TextField from 'material-ui/TextField'

const mutationChangeTitle = gql`
  mutation updateTitle($id: ID!, $title: String!) {
    updateTaskTitle(id: $id, newTitle: $title) {
      id
      title
    }
  }
`

export default class UpdateTitle extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      showTitle: true
    }
    this.editTitle = this.editTitle.bind(this)
    this.toggleTitle = this.toggleTitle.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    this.setState({value: this.props.title})
  }

  editTitle(evt) {
    this.setState({
      value: evt.target.value
    })
  }

  toggleTitle() {
    this.setState({
      showTitle: !this.state.showTitle
    })
  }

  handleKeyUp(evt) {
    evt.stopPropagation()
  }

  render() {
    const {
      handleChange,
      task,
      title
    } = this.props

    const { showTitle } = this.state

    return (
      <div>
      <Mutation mutation={mutationChangeTitle}>
        {updateTitle => {
          return (
            // Input field to change title
            <TextField
              value={title}
              onKeyUp={this.handleKeyUp}
              autoFocus={true}
              onChange={this.editTitle}
              onBlur={evt => {
                const newTitle = evt.target.value
                updateTitle({ variables: { id: task.id, title: newTitle } })
                handleChange()
              }}
              type="text"
              value={this.state.value}
            />
          )
        }}
      </Mutation>
      </div>
    )
  }
}
