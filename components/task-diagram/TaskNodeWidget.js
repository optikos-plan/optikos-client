import * as React from 'react'
import { PortWidget } from 'storm-react-diagrams'
import axios from 'axios'

/**
 * @author Dylan Vorster
 */

export class TaskNodeWidget extends React.Component {
  constructor(props) {
    // should also send in a changeTitleFn() as prop
    super(props)
    const { node } = props
    console.log('TaskNodeWidget:14; Node: ', node)
    this.state = {
      showTitle: true,
      title: node.task.title,
      dueDate: node.task.endDate,
      // assignee: node.task.user.name,
      titleChanged: false
    }
    if (node.task.user && node.task.user.name) {
      console.log(node.task.user.name)
    }
    this.switchToEdit = this.switchToEdit.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async switchToEdit() {
    const { node } = this.props
    const {titleChanged, showTitle} = this.state
    if (titleChanged) {
      // TODO: move request to whatever remote server we're going to use
      await axios.put(`http://localhost:3000/api/tasks/${node.task.id}`, {
        title: this.state.title
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

  render() {
    return (
      <div
        className={'task-node'}
        style={{
          position: 'relative',
          width: this.props.size,
          height: this.props.size / 3
        }}>
        <div
          className="nodeBody"
          style={{
            position: 'absolute'
          }}
          >
          <div className="nodeTitleAndDate">
            {this.state.showTitle ? (
              <span
                onDoubleClick={this.switchToEdit}
                style={{ position: 'absolute', top: 30, left: 8 }}>
                {/* {this.props.node.task.title} */}
                {this.state.title}
              </span>
            ) : (
                <input
                  onKeyUp={this.handleKeyUp}
                  autoFocus={true}
                  defaultValue={this.state.title}
                  onChange={this.handleChange}
                  onBlur={this.switchToEdit}
                  type="text"
                  style={{ position: 'absolute', top: 5, left: 5 }}
                />
              )}
          </div>
          <div className="nodeAssignee">
            <span className="nodeAssigneePlaceHolder">+</span>
          </div>
        </div>
        <svg
          width={this.props.size}
          height={this.props.size / 3}
          dangerouslySetInnerHTML={{
            __html: `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
          <rect fill="steelblue" x="0" y="0" rx="10" ry="10" width="${
            this.props.size
          }" height="${this.props.size / 3}"/>
          </g>
        `
          }}
        />
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            top: this.props.size / 6 - 8,
            left: -8,
          }}>
          <PortWidget name="left" node={this.props.node} />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8,
            top: -8
          }}>
          <PortWidget name="top" node={this.props.node} />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.size - 8,
            top: this.props.size / 6 - 8
          }}>
          <PortWidget name="right" node={this.props.node} />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: this.props.size / 2 - 8,
            top: this.props.size / 3 - 8
          }}>
          <PortWidget name="bottom" node={this.props.node} />
        </div>
      </div>
    )
  }
}
TaskNodeWidget.defaultProps = {
  size: 225,
  node: null
}
