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
          defaultValue={title}
          onChange={handleChange}
          onBlur={() => {
            updateTitle({ variables: { id: node.task.id, title: title } })
            toggleTitle()
          }}
          type="text"
          style={{
            width: '70%',
            height: '1.5rem',
            fontSize: '2rem'
          }}
        />
      )
    }}
  </Mutation>
)

export default UpdateTitle
