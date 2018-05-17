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
import CreateTask from './mutations/createTask'

import 'storm-react-diagrams/dist/style.min.css'

const NOP = () => console.log(`oi, this should have been nop'd`)

export default class TaskNode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskSelected: false,
      taskSelectedData: {},
      taskPositions: {}
    }

    this.registerEngine()
    this.selectedCheck = this.selectedCheck.bind(this)
    this.updateLink = this.updateLink.bind(this)
    this.switchToEdit = NOP
    // this.switchToEdit = this.switchToEdit.bind(this)
    this.createTask = this.createTask.bind(this)
    this.serialize = this.writeToStorage.bind(this)

    // TODO: These functions need to be extracted. It will be some work
    // as there seems to be some dependency based on how they're passed
    // down as positional arguments to some functions.
    //
    this.nodePersistDate = NOP
    this.changeAssignee = NOP
  }

  // TODO: check error when merging with all projects page

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.writeToStorage()
  }

  readFromStorage() {
    const { projectId } = this.props
    const data = localStorage.getItem(`Project:${projectId}`)
    if (!data) return

    const serialized = JSON.parse(data)
    this.model = new DiagramModel()
    this.model.deSerializeDiagram(serialized, this.engine)
    this.engine.setDiagramModel(this.model)
  }

  writeToStorage() {
    // TODO: Cannot be called from the join link function because
    // `this` does not have access to tasks.
    //
    // Suggestion: This component itself should be an apollo connected client
    // and add-links should force a refetch of data that should satisfy the
    // conditions
    //
    //
    console.log('writing to localStorage')
    console.trace('what is happening')
    const { projectId } = this.props

    const serialized = JSON.stringify(this.model.serializeDiagram())
    localStorage.setItem(`Project:${projectId}`, serialized)
  }

  componentDidMount() {
    this.readFromStorage()
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
    const sceneNodes = new Map()
    const sceneLinks = []

    // Add task to Scene only IFF it is not there already
    //
    const addToScene = task => {
      if (sceneNodes.has(task.id)) return sceneNodes.get(task.id)

      const node = new TaskNodeModel(
        task,
        this.updateLink,
        this.switchToEdit,
        this.nodePersistDate,
        this.changeAssignee
      )
      sceneNodes.set(task.id, node)
      this.model.addNode(node)
      return node
    }

    // Link each child node to its parent
    this.props.tasks.forEach(task => {
      const parentPort = addToScene(task).getPort('bottom')

      task.children.forEach(child => {
        const childPort = addToScene(child).getPort('top')
        const link = parentPort.link(childPort)
        sceneLinks.push(link)
      })
    })

    this.model.addAll(...sceneLinks)
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

  updateLink(event, node) {
    const target = event.target.dataset.name
    const port = node.ports[target]
    const links = port.links

    const oldLinks = {}
    for (let key of Object.keys(links)) {
      oldLinks[key] = links[key]
    }

    /* There is a Race condition/timing issue where the mouseUp event is
     * dispatched to our component prior to react-diagram which mutates data our
     * component needs.  We defer execution to the next event tick to ensure the
     * mutated data is available.
     *
     * Use a Promise in order to await the result from the deferred/timeout
     * function.
     */
    return new Promise(resolve => {
      setTimeout(() => {
        let parent = {}
        let child = {}
        for (let key in links) {
          if (!(key in oldLinks)) {
            if (target === 'top') {
              parent = links[key].sourcePort.parent
              child = links[key].targetPort.parent
            } else if (target === 'bottom') {
              parent = links[key].targetPort.parent
              child = links[key].sourcePort.parent
            }
          }
        }
        return resolve({ childId: child.task.id, parentId: parent.task.id })
      }, 0)
    })
  }

  createTask(task) {
    const node = new TaskNodeModel(
      task,
      this.updateLink,
      this.switchToEdit,
      this.nodePersistDate,
      this.changeAssignee,
      this.serialize
    )
    this.model.addNode(node)
    this.forceUpdate()
  }

  render() {
    const task = this.state.taskSelectedData
    if (this.state.updateTasks) {
      this.updateTasks()
    }

    return (
      <div className="srd-diagram">
        <Sidebar
          allTasks={this.props.tasks}
          task={task}
          taskSelected={this.state.taskSelected}
        />
        <div className="diagram-container" onClick={this.selectedCheck}>
          <CreateTask
            projectId={this.props.projectId}
            createTask={this.createTask}
          />
          <DiagramWidget
            model={this.model}
            diagramEngine={this.engine}
            maxNumberPointsPerLink={0}
          />
        </div>
      </div>
    )
  }
}
