import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
import moment from 'moment'

import NodeAssigneeDialog from './NodeAssigneeDialog'

import DatePicker from './mutations/calendar'
import UpdateTitle from './mutations/updateTitle'
import UpdateLink from './mutations/updateLink'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import NodeAssigneeList from './NodeAssigneeList'

export class TaskNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    const { node } = props
    this.state = {
      showTitle: true,
      title: node.task.title,
      dueDate: node.task.endDate,
      assignee: node.task.user,
      showGenDialog: false
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleTitle = this.toggleTitle.bind(this)
    this.deltaAssignee = this.deltaAssignee.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  handleKeyUp(evt) {
    evt.stopPropagation()
  }

  handleChange(evt) {
    this.setState({
      title: evt.target.value
    })
  }

  toggleTitle() {
    this.setState({
      showTitle: !this.state.showTitle
    })
  }

  deltaAssignee(member) {
    this.setState({
      assignee: member
    })
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
    const { showTitle, title, dueDate, assignee } = this.state
    // TODO: move to general dialog component
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.closeDialog}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        disabled={true}
        onClick={this.closeDialog}
      />
    ]
    return (
      // Entire node
      <div
        className={'task-node'}
        style={{
          position: 'relative',
          width: size,
          height: size / 3
        }}>
        {/* Node Content */}
        <div
          className="nodeBody"
          style={{
            position: 'absolute'
          }}
          onDoubleClick={this.openDialog}
        >
          {/* Title and Date Section */}
          <div className="nodeTitleAndDate">
            <strong
              style={{
                position: 'absolute',
                top: 15,
                left: 8
              }}
            >
              {title}
            </strong>

            {/* Due Date */}
            <strong
              style={{
                fontSize: '0.65rem',
                color: 'rgb(223, 223, 27)',
                position: 'absolute',
                left: '10px',
                top: '50px'
              }}
            >
              {moment(dueDate).format('MMM Do YYYY')}
            </strong>
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
              <NodeAssigneeDialog
                assignee={assignee}
                changeAssignee={node.changeAssignee}
                deltaAssignee={this.deltaAssignee}
                node={node}
              />
            </div>
          }
        </div>
        {/* TODO: move to general dialog component */}
        <Dialog
          title={`Task's Overview`}
          titleStyle={{
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
          actions={actions}
          modal={true}
          open={this.state.showGenDialog}
          autoScrollBodyContent={true}
        >
          <span
            style={{
              marginTop: '1rem',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}
          >Task Name: </span>
          <UpdateTitle
            handleChange={this.handleChange}
            handleKeyUp={this.handleKeyUp}
            showTitle={showTitle}
            node={node}
            title={title}
            toggleTitle={this.toggleTitle}
          />

          <h1>Due Date:</h1>
          <DatePicker node={node} dueDate={dueDate} />
          <h1>Task Assignee:</h1>
          <NodeAssigneeList
            changeAssignee={this.changeAssignee}
            deltaAssignee={this.deltaAssignee}
          />
        </Dialog>
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
      </div>
    )
  }
}
TaskNodeWidget.defaultProps = {
  size: 225,
  node: null
}
