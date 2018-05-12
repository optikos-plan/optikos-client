import React from 'react'
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

const UpdateTitle = ({
  handleChange,
  handleKeyUp,
  showTitle,
  node,
  title,
  toggleTitle
}) => (
  <Mutation mutation={mutationChangeTitle}>
    {updateTitle => {
      return showTitle ? (
        <strong
          onDoubleClick={() => {
            updateTitle({ variables: { id: node.task.id, title: title } })
            toggleTitle()
          }}
          style={{ position: 'absolute', top: 15, left: 8 }}>
          {/* {node.task.title} */}
          {title}
        </strong>
      ) : (
        // Input field to change title
        <input
          onKeyUp={handleKeyUp}
          autoFocus={true}
          defaultValue={title}
          onChange={handleChange}
          onBlur={() => {
            updateTitle({ variables: { id: node.task.id, title: title } })
            toggleTitle()
          }}
          type="text"
          style={{ position: 'absolute', top: 5, left: 5 }}
        />
      )
    }}
  </Mutation>
)

export default UpdateTitle
