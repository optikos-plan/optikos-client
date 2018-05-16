import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import NodeAssigneeList from './NodeAssigneeList'

import UpdateTitle from './mutations/updateTitle'
import DatePicker from './mutations/calendar'

const GenDialog = () => {
  const {
    handleChange,
    handleKeyUp,
    showTitle,
    node,
    title,
    toggleTitle,
    dueDate,
    changeAssignee,
    deltaAssignee,
    closeDialog,
    showGenDialog,
    assignee
  } = this.props

  const actions = [
    <FlatButton key={1} label="OK" primary={true} onClick={closeDialog} />
  ]
  // return Dialog component
  return (
    <Dialog
      title={`Task's Overview`}
      titleStyle={{
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}
      actions={actions}
      modal={true}
      open={showGenDialog}
      autoScrollBodyContent={true}
    >
      <div className="genDialogSectionRow">
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          Task Name:{' '}
        </h1>
        <UpdateTitle
          handleChange={handleChange}
          handleKeyUp={handleKeyUp}
          showTitle={showTitle}
          node={node}
          title={title}
          toggleTitle={toggleTitle}
        />
      </div>

      <div className="genDialogSectionRow">
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          Due Date:
        </h1>
        <DatePicker node={node} dueDate={dueDate} />
      </div>

      <div className="genDialogSectionCol">
        <h1>Task Assignee:</h1>
        <NodeAssigneeList
          changeAssignee={changeAssignee}
          deltaAssignee={deltaAssignee}
          assignee={assignee}
          node={node}
        />
      </div>
    </Dialog>
  )
}

export default GenDialog
