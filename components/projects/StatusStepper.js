import React from 'react'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

export default class Status extends React.Component {
  constructor() {
    super()
    this.state = {
      stepIdx: null
    }
  }

  // TODO: to use or not to use?

  // getStepContent(stepIdx) {
  //   switch(stepIdx) {
  //     case 0:
  //       return 'Project owner has been assigned'
  //     case 1:
  //       return 'This project is in progress. Click on the "More Details" button for information '
  //     case 2:
  //       return 'This project is completed!'
  //   }
  // }

  render() {
    const {stepIdx} = this.state
    const {project} = this.props
    const allCompleted = (arr) => arr.every(task => task.status === 'COMPLETED')

    return (
      <div>
        <Stepper
          linear={false}
          activeStep={stepIdx}
        >
          <Step
            completed={
              project.owner ?
              true : false
            }
          >
            <StepLabel>Assigned</StepLabel>
          </Step>
          <Step
            completed={project.owner && project.tasks.length > 0}
          >
            <StepLabel>In Progress</StepLabel>
          </Step>
          <Step
            completed={project.owner && project.tasks.length > 0 && allCompleted(project.tasks)}
          >
            <StepLabel>Completed</StepLabel>
          </Step>
        </Stepper>
      </div>
    )
  }
}
