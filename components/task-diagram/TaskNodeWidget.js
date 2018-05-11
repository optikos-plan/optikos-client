
import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DatePicker from 'material-ui/DatePicker'
import NodeAssigneeDialog from './NodeAssigneeDialog'

import moment from 'moment'

/**
 * @author Optikos Team
 */

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: 'rgb(223, 223, 27)',
    headerColor: 'steelblue'
  },
  textField: {
    className: 'nodeDatePop'
  }
})

export class TaskNodeWidget extends React.Component {

  constructor(props) {
    // should also send in a changeTitleFn() as prop
    super(props)
    const { node } = props
    this.state = {
      showTitle: true,
      title: node.task.title,
      dueDate: node.task.endDate,
      assignee: node.task.user,
      titleChanged: false
    }

    this.switchToEdit = this.switchToEdit.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nodePersistDate = this.nodePersistDate.bind(this)
    this.changeAssignee = this.changeAssignee.bind(this)
  }

  async switchToEdit() {
    const { node } = this.props
    const { titleChanged, showTitle, title } = this.state
    if (titleChanged) {
      // TODO: move request to whatever remote server we're going to use
      await axios.put(`http://localhost:3000/api/tasks/${node.task.id}`, {
        title: title
      })
    }
    this.setState({
      showTitle: !showTitle
    })
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

  // TODO: change to online server
  async nodePersistDate(date) {
    const { node } = this.props
    await axios.put(`http://localhost:3000/api/tasks/${node.task.id}`, {
      endDate: date
    })
  }

  // TODO: change to online server
  async changeAssignee(evt, member) {
    const { node } = this.props
    this.setState({
      assignee: member
    })
    await axios.put(`http://localhost:3000/api/tasks/${node.task.id}`, {
      userId: member.id
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
        }}
      >
        {/* Node Content */}
        <div
          className="nodeBody"
          style={{
            position: 'absolute'
          }}
        >
          {/* Title and Date Section */}
          <div className="nodeTitleAndDate">
            {showTitle ? (
              <strong
                onDoubleClick={this.switchToEdit}
                style={{ position: 'absolute', top: 15, left: 8 }}
              >
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
                onBlur={this.switchToEdit}
                type="text"
                style={{ position: 'absolute', top: 5, left: 5 }}
              />
            )}
            {/* Date Picker */}
            {
              <div
                className="nodeDatePicker"
                style={{
                  position: 'absolute',
                  top: 65,
                  left: 8,
                  height: '1rem'
                }}
              >
                <MuiThemeProvider muiTheme={muiTheme}>
                  <DatePicker
                    id={node.task.id.toString()}
                    formatDate={date => moment(date).format('MMM Do YYYY')}
                    hintText={
                      dueDate ? (
                        moment(dueDate).format('MMM Do YYYY')
                      ) : (
                        <span className="nodeDatePop">Enter Due Date</span>
                      )
                    }
                    container="inline"
                    onChange={(_, date) =>
                      this.nodePersistDate(moment(date).format('YYYY-MM-DD'))
                    }
                  />
                </MuiThemeProvider>
              </div>
            }
          </div>
          {/* Node Assignee Section */}
          {
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%'
              }}
            >
              <NodeAssigneeDialog
                assignee={assignee}
                changeAssignee={this.changeAssignee}
              />
            </div>
          }
          {/* {assignee ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%'
              }}
            >
              <h1
                style={{
                  width: '100%',
                  'text-align': 'center'
                }}
              >
                {nameToInitial(assignee)}
              </h1>
            </div>
          ) : (
            <NodeAssigneeDialog />
          )} */}
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
          }}
        >
          <PortWidget name="left" node={node} />
        </div>
        <div
          onMouseUp={(event)=> node.updateLink(event, node)}
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size / 2 - 8,
            top: -8
          }}
        >
          <PortWidget name="top" node={node} />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size - 8,
            top: size / 6 - 8
          }}
        >
          <PortWidget name="right" node={node} />
        </div>
        <div
         onMouseUp={(event)=> node.updateLink(event, node)}
          style={{
            position: 'absolute',
            zIndex: 10,
            left: size / 2 - 8,
            top: size / 3 - 8
          }}
        >
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

