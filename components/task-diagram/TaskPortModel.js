import * as _ from 'lodash'
import {
  PortModel,
  DefaultLinkModel,
  DefaultPortModel
} from 'storm-react-diagrams'

export class TaskPortModel extends PortModel {
  constructor(pos = 'top') {
    super(pos, 'task')
    this.position = pos
  }
  serialize() {
    return _.merge(super.serialize(), {
      position: this.position
    })
  }

  link(port) {
    let link = this.createLinkModel()
    link.setSourcePort(this)
    link.setTargetPort(port)
    return link
  }

  serialize() {
    return _.merge(super.serialize(), { in: this.in, label: this.label })
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine)
    this.position = data.position
  }
  createLinkModel() {
    return super.createLinkModel() || new DefaultLinkModel()
  }
}
