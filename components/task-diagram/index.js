import {
  DiagramEngine,
  DiagramModel,
  DiagramWidget
} from 'storm-react-diagrams'
import * as React from 'react'

// import the custom models
import { TaskNodeModel } from './TaskNodeModel'
import { TaskNodeFactory } from './TaskNodeFactory'
import { SimplePortFactory } from './SimplePortFactory'
import { TaskPortModel } from './TaskPortModel'
import axios from 'axios'

import 'storm-react-diagrams/dist/style.min.css'
/**
 * @Author Dylan Vorster
 */
export default class TaskNode extends React.Component {
  constructor() {
    super()

    this.state = { tasks: [] }

    this.registerEngine()
  }

  registerEngine() {
    this.engine = new DiagramEngine()
    this.engine.installDefaultFactories()

    this.engine.registerPortFactory(
      new SimplePortFactory('task', config => new TaskPortModel())
    )

    this.engine.registerNodeFactory(new TaskNodeFactory())
    this.model = new DiagramModel()
    this.updateTasks()
    this.engine.setDiagramModel(this.model)
  }

  updateTasks() {
    console.log(this.state.tasks)
    const nodeContainer = {}
    const ports = []
    const links = []
    this.state.tasks.forEach(task => {
      const node = new TaskNodeModel(task)
      this.model.addNode(node)
    })
  }

  async componentDidMount() {
    const { data } = await axios.get(
      'https://optikos-data-db.herokuapp.com/api/tasks'
    )
    this.setState({ tasks: data }, () => this.updateTasks())
    this.forceUpdate()
  }

  render() {
    return <DiagramWidget model={this.model} diagramEngine={this.engine} />
  }
}
