import * as SRD from 'storm-react-diagrams'
import { TaskNodeWidget } from './TaskNodeWidget'
import { TaskNodeModel } from './TaskNodeModel'
import * as React from 'react'

export class TaskNodeFactory extends SRD.AbstractNodeFactory {
  constructor(props) {
    super('task')
  }

  generateReactWidget(diagramEngine, node) {
    return <TaskNodeWidget node={node} />
  }

  getNewInstance() {
    return new TaskNodeModel()
  }
}