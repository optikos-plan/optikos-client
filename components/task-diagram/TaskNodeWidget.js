import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
import NodeAssigneeDialog from './NodeAssigneeDialog'

import DatePicker from './mutations/calendar'
import UpdateTitle from './mutations/updateTitle'
import UpdateLink from './mutations/updateLink'
import DeleteTask from './mutations/deleteTask'

export class TaskNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    const { node } = props
    this.state = {
      showTitle: true,
      title: node.task.title,
      dueDate: node.task.endDate,
      assignee: node.task.user
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleTitle = this.toggleTitle.bind(this)
    this.deltaAssignee = this.deltaAssignee.bind(this)
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

  render() {
    const { size, node } = this.props
    const { showTitle, title, dueDate, assignee } = this.state
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
          }}>
         <DeleteTask id={node.task.id} />
          {/* Title and Date Section */}
          <div className="nodeTitleAndDate">
            <UpdateTitle
              handleChange={this.handleChange}
              handleKeyUp={this.handleKeyUp}
              showTitle={showTitle}
              node={node}
              title={title}
              toggleTitle={this.toggleTitle}
            />

            {/* Date Picker */}
            <DatePicker node={node} dueDate={dueDate} />
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
