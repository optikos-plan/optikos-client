import { NodeModel } from 'storm-react-diagrams'
import { TaskPortModel } from './TaskPortModel'

export class TaskNodeModel extends NodeModel {
  constructor(task) {
    super('task')
    this.addPort(new TaskPortModel('top'))
    this.addPort(new TaskPortModel('left'))
    this.addPort(new TaskPortModel('bottom'))
    this.addPort(new TaskPortModel('right'))
    this.task = task
  }

  serialize() {
    return _.merge(super.serialize(), {
      task: this.task
    })
  }

  getInPorts() {
    return _.filter(this.ports, portModel => portModel.in)
  }

  getOutPorts() {
    return _.filter(this.ports, portModel => !portModel.in)
  }
}
