import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

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

  editTitle(evt) {
    console.log('editing title...', evt.target.value)
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
      <Mutation mutation={mutationChangeTitle}>
        {updateTitle => {
          return showTitle && title ? (
            <strong
              onDoubleClick={() => {
                this.toggleTitle()
              }}
              style={{
                fontSize: '2rem'
              }}
            >
              {/* {node.task.title} */}
              {title}
            </strong>
          ) : (
            // Input field to change title
            <input
              onKeyUp={this.handleKeyUp}
              autoFocus={true}
              placeholder={title}
              onChange={this.editTitle}
              onBlur={evt => {
                const newTitle = evt.target.value
                updateTitle({ variables: { id: task.id, title: newTitle } })
                this.toggleTitle()
                handleChange()
              }}
              type="text"
              style={{
                width: '70%',
                height: '1.5rem',
                fontSize: '2rem'
              }}
              value={this.state.value}
            />
          )
        }}
      </Mutation>
    )
  }
}
