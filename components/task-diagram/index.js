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

const NOP = () => console.log(`oi, this should have been nop'd`)

export default class TaskNode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskSelected: false,
      taskSelectedData: {}
    }

    this.registerEngine()
    this.selectedCheck = this.selectedCheck.bind(this)
    this.updateLink = this.updateLink.bind(this)
    this.switchToEdit = this.switchToEdit.bind(this)
    this.nodePersistDate = NOP
    this.changeAssignee = NOP
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
    const nodeContainer = {}
    const links = []

    this.props.tasks.forEach(task => {
      // do not duplicate nodes
      if (!(task.id in nodeContainer)) {
        const node = new TaskNodeModel(
          task,
          this.updateLink,
          this.switchToEdit,
          this.nodePersistDate,
          this.changeAssignee
        )
        nodeContainer[task.id] = node
        this.model.addNode(node)
        // does the tasks have children
        const parentPort = node.getPort('bottom')

        task.children.forEach(child => {
          // avoid duplication of nodes
          if (!(child.id in nodeContainer)) {
            // preventing error on load
            if (child) {
              const childNode = new TaskNodeModel(
                child,
                this.updateLink,
                this.switchToEdit,
                this.nodePersistDate,
                this.changeAssignee
              )
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
        this.setState({ taskSelected: true })
        this.setState({ taskSelectedData: nodes[x].task })
        return true
      }
    }
    this.setState({ taskSelected: false })
    return false
  }

  // race condition scenario
  // event listener responsible for updating links runs after our MouseUp listener
  // need to use setTimeout to correct order
  updateLink(event, node) {
    const target = event.target.dataset.name
    const port = node.ports[target]
    const links = port.links

    //create hash of old Links
    const oldLinks = {}

    for (let x of Object.keys(links)) {
      oldLinks[x] = links[x]
    }

    setTimeout(() => {
      let parent = {}
      let child = {}
      for (let x in links) {
        if (!(x in oldLinks)) {
          if (target === 'top') {
            parent = links[x].sourcePort.parent
            child = links[x].targetPort.parent
          } else if (target === 'bottom') {
            parent = links[x].targetPort.parent
            child = links[x].sourcePort.parent
          }
        }
      }
      console.log('parent node is: ', parent)
      console.log('new child to add:', child)
    }, 0)
  }

  async switchToEdit(node, titleChanged, showTitle, title) {
    if (titleChanged) {
      // TODO: move request to whatever remote server we're going to use
      await axios.put(`http://localhost:3000/api/tasks/${node.task.id}`, {
        title: title
      })
    }
  }

  render() {
    const task = this.state.taskSelectedData

    return (
      <div className="srd-diagram">
        <Sidebar
          allTasks={this.props.tasks}
          task={task}
          taskSelected={this.state.taskSelected}
          git
        />
        <button onClick={this.saveLayout}>SAVE</button>
        <div className="srd-diagram" onClick={this.selectedCheck}>
          <DiagramWidget model={this.model} diagramEngine={this.engine} />
        </div>
      </div>
    )
  }
}
