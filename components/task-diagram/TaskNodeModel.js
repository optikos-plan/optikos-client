import { NodeModel } from 'storm-react-diagrams'
import { TaskPortModel } from './TaskPortModel'

export class TaskNodeModel extends NodeModel {
  constructor(task, updateLink, switchToEdit) {
    super('task')
    this.addPort(new TaskPortModel('top'))
    this.addPort(new TaskPortModel('left'))
    this.addPort(new TaskPortModel('bottom'))
    this.addPort(new TaskPortModel('right'))
    this.task = task
    this.updateLink = updateLink
    this.switchToEdit = switchToEdit
  }

  serialize() {
    return _.merge(super.serialize(), {
      task: this.task,
      updateLink: this.updateLink,
      switchToEdit: this.switchToEdit
    })
  }

  deSerialize(ob, engine) {
    console.log('TaskNodeModel::deSerialize', ob)
    super.deSerialize(ob, engine)
    this.x = ob.x
    this.y = ob.y
    this.task = ob.task
    this.updateLink = ob.updateLink
    this.switchToEdit = ob.switchToEdit
    this.extras = ob.extras

    // do ports
    _.forEach(ob.ports, port => {
      let portOb = engine.getPortFactory(port.type).getNewInstance()
      portOb.deSerialize(port, engine)
      this.addPort(portOb)
    })
  }

  getInPorts() {
    return _.filter(this.ports, portModel => portModel.in)
  }

  getOutPorts() {
    return _.filter(this.ports, portModel => !portModel.in)
  }
}
