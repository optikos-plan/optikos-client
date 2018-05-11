import {
  DiagramEngine,
  DiagramModel,
  DiagramWidget
} from 'storm-react-diagrams'
import * as React from 'react'

// import the custom models
import { TaskNodeModel } from './TaskNodeModel'
import Sidebar from '../Sidebar'
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
    this.state = { tasks: [],
    taskSelected: false,
    taskSelectedData: {},
}


    this.registerEngine()
    this.selectedCheck = this.selectedCheck.bind(this)
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

  selectedCheck() {
    const nodes = this.model.nodes

    for (let x of Object.keys(nodes)) {
      if (nodes[x].selected) {
        this.setState({taskSelected: true})
        this.setState({taskSelectedData: nodes[x].task})
        return true
      }
    }
    this.setState({taskSelected: false})
    return false
  }

  // grab data from heroku server
  //
  async componentDidMount() {
    // TODO: change back to remote server after testing
    // const { data } = await axios.get(
    //   'https://optikos-data-db.herokuapp.com/api/tasks'
    // )
    const { data } = await axios.get('http://localhost:3000/api/tasks')

    // TODO: this right here
    this.setState({ tasks: data }, async () => {
      await this.updateTasks()
      await this.forceUpdate()
    })

  }

  // grab from local server for testing purposes
  //
  async xxxcomponentDidMount() {
    const DB_URL = 'http://localhost:3000/api/serialize'

    console.log(DB_URL)
    const { data } = await axios.get(DB_URL)
    console.log('DATA from Server', data)

    // deserialize data
    this.model = new DiagramModel()
    this.model.deSerializeDiagram(data, this.engine)
    this.engine.setDiagramModel(this.model)

    this.forceUpdate()
  }

  saveLayout = async () => {
    //
    const serialized = this.model.serializeDiagram()
    console.log(JSON.stringify(serialized, undefined, 2))
    const DB_URL = 'http://localhost:3000/api/serialize'
    const res = await axios.post(DB_URL, serialized)
    console.log('Response from serialize Post', res)
  }

  render() {
    const task = this.state.taskSelectedData

    return (
      <div className="srd-diagram">
        <Sidebar  allTasks={this.state.tasks} task={task} taskSelected={this.state.taskSelected}git/>
        <button onClick={this.saveLayout}>SAVE</button>
      <div className="srd-diagram" onClick={this.selectedCheck} >
        <DiagramWidget model={this.model} diagramEngine={this.engine} />
   </div>
      </div>
    )
  }
}
