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
    // FIXME: eager loading only on first level 'task' and not its children... GraphQL is going to fix this for us

    const nodeContainer = {}
    const links = []

    this.state.tasks.forEach(task => {
      // do not duplicate nodes
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
  }

  async componentDidMount() {
    // TODO: change back to remote server after testing
    // const { data } = await axios.get(
    //   'https://optikos-data-db.herokuapp.com/api/tasks'
    // )
    const { data } = await axios.get('http://localhost:3000/api/tasks')
    console.log('index.js: 77; Fresh data: ', data)
    // create a dictionary that maps userId -> user object
    // walk through the data
    // insert user as necessary
    //
    // TODO: this right here
    this.setState({ tasks: data }, async () => {
      await this.updateTasks()
      await this.forceUpdate()
    })
  }

  render() {
    return <DiagramWidget model={this.model} diagramEngine={this.engine} />
  }
}
