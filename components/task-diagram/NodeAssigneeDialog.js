import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import NodeAssigneeList from './NodeAssigneeList'
import nameToInitial from '../../utils/nameToInitial'

// TODO: update database based on user selected

export default class NodeAssigneeDialog extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }
  render () {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
        style={{
          marginRight: '1rem'
        }}
        />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ]

    const {assignee, changeAssignee} = this.props

    return (
      <div className={
        assignee ?
        "nodeAsignee-chosen"
        : "nodeAssignee-choose"}>
      <FlatButton
        label={
          assignee ?
          nameToInitial(assignee.name)
          : '+'
        }
        labelStyle={
          assignee ?
          {fontSize: '2rem', fontWeight: 'bold'}
          : {fontSize: '3rem'}
        }
        disableFocusRipple={true}
        disableTouchRipple={true}
        style={{
          width:"50px",
          height:"50px",
          minWidth: "0px",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={this.handleOpen}
      />
      <Dialog
        title="Team"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
      >
        <NodeAssigneeList changeAssignee={changeAssignee} />
      </Dialog>
      </div>
    )
  }
}
