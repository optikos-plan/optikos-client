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
    console.log('This state tasks: ', this.state.tasks)
    const nodeContainer = {}
    const links = []

    this.state.tasks.forEach(task => {
      // do not duplicate nodes
      // console.log('Test: ', task.id, nodeContainer)
      if (!(task.id in nodeContainer)) {
        const node = new TaskNodeModel(task)
        nodeContainer[task.id] = node
        this.model.addNode(node)
        // does the tasks have children
        const parentPort = node.getPort('bottom')
        task.children.forEach(child => {
          // avoid duplication of nodes
          if (!(child.id in nodeContainer)) {
            // preventing error on load
            if (child) {
              const childNode = new TaskNodeModel(child)
              nodeContainer[child.id] = childNode
              this.model.addNode(childNode)
            }
          }
          const childPort = nodeContainer[child.id].getPort('top')
          const link = parentPort.link(childPort)
          links.push(link)
        })
      }
    })

    this.model.addAll(...links)
    console.log('Node container: ', nodeContainer)
    console.log('Links: ', links)
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
