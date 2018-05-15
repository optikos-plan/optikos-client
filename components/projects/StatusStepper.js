import React from 'react'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

const Status = (props) => {
  const { project } = props
  const allCompleted = arr => arr.every(task => task.status === 'COMPLETED')

  return (
    <div>
      <Stepper linear={false}>
        <Step completed={project.owner ? true : false}>
          <StepLabel>Assigned</StepLabel>
        </Step>
        <Step completed={project.owner && project.tasks.length > 0}>
          <StepLabel>In Progress</StepLabel>
        </Step>
        <Step
          completed={
            project.owner &&
            project.tasks.length > 0 &&
            allCompleted(project.tasks)
          }
        >
          <StepLabel>Completed</StepLabel>
        </Step>
      </Stepper>
    </div>
  )
}

export default Status
