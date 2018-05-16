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
      value: ''
    }
    this.editTitle = this.editTitle.bind(this)
  }

  editTitle (evt) {
    console.log('editing title...', evt.target.value)
    this.setState({
      value: evt.target.value
    })
  }

    render() {
    const {
      handleChange,
      handleKeyUp,
      showTitle,
      task,
      title,
      toggleTitle
    } = this.props

      return (
        <Mutation mutation={mutationChangeTitle}>
          {updateTitle => {
            return showTitle && title ? (
              <strong
                onDoubleClick={() => {
                  toggleTitle()
                  }
                }
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
                onKeyUp={handleKeyUp}
                autoFocus={true}
                placeholder={title}
                onChange={this.editTitle}
                onBlur={(evt) => {
                  const newTitle = evt.target.value
                  updateTitle({ variables: { id: task.id, title: newTitle } })
                  toggleTitle()
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
