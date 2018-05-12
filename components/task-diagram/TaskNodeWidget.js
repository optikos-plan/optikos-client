import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
// import axios from 'axios'
import NodeAssigneeDialog from './NodeAssigneeDialog'
import DatePicker from './calendar'

/**
 * @author Optikos Team
 */

export class TaskNodeWidget extends React.Component {
  constructor(props) {
    super(props)
    const { node } = props
    this.state = {
      showTitle: true,
      title: node.task.title,
      dueDate: node.task.endDate,
      assignee: node.task.user,
      titleChanged: false
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
      title: evt.target.value,
      titleChanged: true
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
    const { showTitle, title, dueDate, assignee, titleChanged } = this.state

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
          {/* Title and Date Section */}
          <div className="nodeTitleAndDate">
            {showTitle ? (
              <strong
                onDoubleClick={() => {
                  node.switchToEdit(node, titleChanged, showTitle, title)
                  this.toggleTitle()
                }}
                style={{ position: 'absolute', top: 15, left: 8 }}>
                {/* {node.task.title} */}
                {title}
              </strong>
            ) : (
              // Input field to change title
              <input
                onKeyUp={this.handleKeyUp}
                autoFocus={true}
                defaultValue={title}
                onChange={this.handleChange}
                onBlur={() => {
                  node.switchToEdit(node, titleChanged, showTitle, title)

                  this.toggleTitle()
                }}
                type="text"
                style={{ position: 'absolute', top: 5, left: 5 }}
              />
            )}
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
        <div
          onMouseUp={event => node.updateLink(event, node)}
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size / 2 - 8,
            top: -8
          }}>
          <PortWidget name="top" node={node} />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size - 8,
            top: size / 6 - 8
          }}>
          <PortWidget name="right" node={node} />
        </div>
        <div
          onMouseUp={event => node.updateLink(event, node)}
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size / 2 - 8,
            top: size / 3 - 8
          }}>
          <PortWidget name="bottom" node={node} />
        </div>
      </div>
    )
  }
}
TaskNodeWidget.defaultProps = {
  size: 225,
  node: null
}
