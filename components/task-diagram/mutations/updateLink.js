import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { PortWidget } from 'storm-react-diagrams'

const updateLink = gql`
  mutation addDependency($childId: ID!, $parentId: ID!) {
    addDependencyToTask(childId: $childId, parentId: $parentId) {
      id
    }
  }
`

const UpdateLink = ({ node, portName, style }) => (
  <Mutation mutation={updateLink}>
    {addDependency => (
      <div
        onMouseUp={async event => {
          const { childId, parentId } = await node.updateLink(event, node)
          addDependency({
            variables: { childId, parentId }
            // options: {
            // updateQueries: ['MainQuery']
            // }
          }) //.then(() => node.serialize())
        }}
        style={style}>
        <PortWidget name={portName} node={node} />
      </div>
    )}
  </Mutation>
)

export default UpdateLink
