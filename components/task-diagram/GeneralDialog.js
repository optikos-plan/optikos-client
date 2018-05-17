import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import NodeAssigneeList from './NodeAssigneeList'

import UpdateTitle from './mutations/updateTitle'
import DatePicker from './mutations/calendar'

const GenDialog = (props) => {
  const {
    handleChange,
    task,
    title,
    dueDate,
    closeDialog,
    showGenDialog,
    assignee
  } = props

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
          task={task}
          title={title}
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
        <DatePicker task={task} dueDate={dueDate} handleChange={handleChange} />
      </div>

      <div className="genDialogSectionCol">
        <h1>Task Assignee:</h1>
        <NodeAssigneeList
          handleChange={handleChange}
          assignee={assignee}
          task={task}
        />
      </div>
    </Dialog>
  )
}

export default GenDialog
