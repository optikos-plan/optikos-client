import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import NodeAssigneeList from './NodeAssigneeList'

import UpdateTitle from './mutations/updateTitle'
import UpdateStatus from './mutations/updateStatus'
import DatePicker from './mutations/calendar'

const GenDialog = (props) => {
  const {
    handleChange,
    task,
    title,
    dueDate,
    closeDialog,
    showGenDialog,
    assignee,
    status
  } = props

  const actions = [
    <FlatButton key={1} label="OK" primary={true} onClick={closeDialog} />
  ]
  // return Dialog component
  return (
    <Dialog
      title={`Task's Overview`}
      // titleStyle={{
      //   fontSize: '2.5rem',
      //   fontWeight: 'bold'
      // }}
      actions={actions}
      modal={true}
      open={showGenDialog}
      autoScrollBodyContent={true}
    >
      <div className="genDialogSectionRow">
        <span
          // style={{
          //   fontSize: '2rem',
          //   fontWeight: 'bold'
          // }}
        >
          Task Name:{' '}
        </span>
        <UpdateTitle
          handleChange={handleChange}
          task={task}
          title={title}
        />
      </div>

      <div className="genDialogSectionRow">
       
         
          Status:{'  '}
 
        <UpdateStatus
          handleChange={handleChange}
          task={task}
          status={status}
        />
      </div>

      <div className="genDialogSectionRow">
        <span
          // style={{
          //   fontSize: '2rem',
          //   fontWeight: 'bold'
          // }}
        >
          Due Date:
        </span>
        <DatePicker task={task} dueDate={dueDate} handleChange={handleChange} />
      </div>

      <div className="genDialogSectionRow">
        <span>Task Assignee:</span>
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
