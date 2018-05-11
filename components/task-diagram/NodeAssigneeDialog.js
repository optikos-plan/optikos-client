import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import NodeAssigneeList from './NodeAssigneeList'

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

    return (
      <div className="nodeAssignee">
      <FlatButton
        label="+"
        labelStyle={{
          fontSize: '3rem',
        }}
        disableFocusRipple={true}
        disableTouchRipple={true}
        style={{
          width:"100%",
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
      >
        <NodeAssigneeList />
      </Dialog>
      </div>
    )
  }
}

