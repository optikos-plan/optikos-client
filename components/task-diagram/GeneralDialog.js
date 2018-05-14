import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class GenDialog extends Component {
  constructor() {
    super()
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.closeDialog} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.closeDialog}
      />
    ]

    return (
      <Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={true}
        open={this.state.showGenDialog}
      >
        This is a test dialog
        </Dialog>
    )
  }
}
