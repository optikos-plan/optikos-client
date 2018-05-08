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
    const ports = []
    const links = []

    this.state.tasks.forEach(task => {
      if (!nodeContainer[task.id]) {
        const node = new TaskNodeModel(task)
        nodeContainer[task.id] = node
        this.model.addNode(node)
        // does the tasks have children
        if (task.children.length > 0) {
          const parentPort = node.getPort('bottom')
          ports.push(parentPort)
          for (let i = 0; i < task.children.length; i++) {
            if (!nodeContainer[task.children[i].id]) {
              if (task.children[i]) {
                const childNode = new TaskNodeModel(task.children[i])
                nodeContainer[task.children[i].id] = childNode
                this.model.addNode(childNode)
                const childPort = childNode.getPort('top')
                ports.push(childPort)
                const link = parentPort.link(childPort)
                links.push(link)
              }
            }
          }
        }
      }
    })
    // if (nodeContainer[1]) {
    //   const parentPort = nodeContainer[1].getPort('bottom')
    //   const childPort = nodeContainer[2].getPort('top')
    //   const link = parentPort.link(childPort)
    //   links.push(link)
    // }

    this.model.addAll(...ports, ...links)
    console.log('Node container: ', nodeContainer)
    console.log('Links: ', links)
    console.log('Ports: ', ports)
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
