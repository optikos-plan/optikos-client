import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
import moment from 'moment'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import UpdateLink from './mutations/updateLink'
import GenDialog from './GeneralDialog'
import DeleteTask from './mutations/deleteTask'

import nameToInitial from '../../utils/nameToInitial'
import Badge from 'material-ui/Badge'

const taskQuery = gql`
  query TaskQuery($id: ID!) {
    task(id: $id) {
      id
      title
      endDate
      status
      user {
        id
        name
      }
      parents {
        id
        title
        status
      }
    }
  }
`

class UnconnectedTaskNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showGenDialog: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  handleChange() {
    this.props.data.refetch()
  }

  // open dialog to edit all node information
  openDialog() {
    this.setState({
      showGenDialog: true
    })
  }

  closeDialog() {
    this.setState({
      showGenDialog: false
    })
  }

  render() {
    const { size, node } = this.props

    if (this.props.data.loading) return <p>Loading</p>
    if (this.props.data.error) return <p>Error...</p>

    const { showGenDialog } = this.state

    const { task } = this.props.data
    const {
      id: taskId,
      title,
      endDate: dueDate,
      user: assignee,
      status
    } = this.props.data.task

    const color = stat => {

      if (stat === 'COMPLETED') {
        return '#76FF03'
      } else if (stat === 'IN_PROGRESS') {
        return 'yellow'
      } else {
        return 'steelblue'
      }
    }

    console.log(task)

    return (
      <Badge
        style={{ padding: '0px' }}
        badgeContent={''}
        badgeStyle={{
          top: '58px',
          right: '95px',
          width: '12px',
          height: '12px',
          backgroundColor: color(status)
        }}>
        {/* // Entire node */}
        <div
          className={'task-node'}
          style={{
            display: 'flex',
            position: 'absolute',
            width: size,
            height: size / 3
          }}
          onDoubleClick={this.openDialog}>
          {/* Node Content */}

         <DeleteTask id={node.task.id} />
          {/* Title and Date Section */}
          <div className="nodeTitleAndDate">
            <h5>{title}</h5>

            {/* Due Date */}
            <p>
              {dueDate
                ? moment(dueDate).format('MMM Do YYYY')
                : 'Enter due Date'}
            </p>
          </div>
          {/* Node Assignee Section */}
          {
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%'
              }}>
              {
                <div
                  className={
                    assignee ? 'nodeAssignee-chosen' : 'nodeAssignee-choose'
                  }>
                  {assignee ? <p>{nameToInitial(assignee.name)}</p> : <p>+</p>}
                </div>
              }
            </div>
          }
        </div>
        {/* Edit Dialog to Change Info on Nodes */}
        <GenDialog
          handleChange={this.handleChange}
          handleKeyUp={this.handleKeyUp}
          node={node}
          task={task}
          title={title}
          dueDate={dueDate}
          assignee={assignee}
          closeDialog={this.closeDialog}
          showGenDialog={showGenDialog}
          status={status}
        />

        {/* Node Shape */}
        <svg
          width={size}
          height={size / 3}
          dangerouslySetInnerHTML={{
            __html: `
            <g id="Layer_1">
            </g>
            <g id="Layer_2">
            <rect fill="steelblue" x="0" y="0" rx="10" ry="10" width="${size}" height="${size /
              3}"/>
            </g>
          `
          }}
        />
        {/* Port Widget Declaration */}
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: size / 6 - 8,
            left: -8
          }}>
          <PortWidget name="left" node={node} />
        </div>
        <UpdateLink
          node={node}
          portName="top"
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size / 2 - 8,
            top: -8
          }}
        />
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size - 8,
            top: size / 6 - 8
          }}>
          <PortWidget name="right" node={node} />
        </div>

        <UpdateLink
          node={node}
          portName="bottom"
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size / 2 - 8,
            top: size / 3 - 8
          }}
        />
      </Badge>
    )
  }
}

UnconnectedTaskNodeWidget.defaultProps = {
  size: 225,
  node: null
}

export const TaskNodeWidget = graphql(taskQuery, {
  options: props => ({
    variables: {
      id: props.node.task.id
    }
  })
})(UnconnectedTaskNodeWidget)
