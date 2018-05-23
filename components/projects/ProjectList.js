import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Status from './StatusStepper'

import { graphql, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const style = {
  margin: 12
}

const customContentStyle = {
  width: '60%',
  maxWidth: 'none'
}

const mutationDeleteProject = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }`


const mutationCreateProject = gql`
  mutation CreateProject(
    $owner: ID!
    $title: String!
    $description: String
    $status: CompletionStatus = ASSIGNED
    $tasks: [ID] = []
  ) {
    createProject(
      owner: $owner
      title: $title
      description: $description
      status: $status
      tasks: $tasks
    ) {
      id
    }
  }
`

class ProjectList extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      owner: '1',
      title: '',
      description: '',
      projectSelected: ''
    }
  }

  handleChange = (event, newValue, payload) => {
    this.setState({
      [event.target.name]: newValue
    })
  }

  handleChangeOwner = (event, _, payload) => {
    this.setState({
      owner: payload
    })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleCreateNewProject = createProject => {
    createProject({
      variables: {
        owner: this.state.owner,
        title: this.state.title,
        description: this.state.description,
        status: this.state.CompletionStatus,
        tasks: this.state.tasks
      },
      /* refetchQueries: ['queryAllProjects'], */
    })
    this.handleClose()
    this.props.data.refetch()
  }

  handleDeleteProject = async (event, deleteProject) => {
		await this.setState({ projectSelected: event.currentTarget.id });
		deleteProject({
			variables: {
				id: this.state.projectSelected
			}
		})
		this.props.data.refetch();
	};

  render() {
    // buttons for the create new project dialog
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <Mutation mutation={mutationCreateProject}>
        {createProject => (
          <FlatButton
            label="Submit"
            primary={true}
            onClick={() => this.handleCreateNewProject(createProject)}
          />
        )}
      </Mutation>
    ]

    const { projects, loading, error, users } = this.props.data

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    return (
      <div className="card-display">
        <div>
          <RaisedButton
            label="CREATE NEW PROJECT"
            onClick={this.handleOpen}
            style={style}
            primary={true}
          />
          {/* Create new project dialog */}
          <Dialog
            title="Create New Project Details:"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}>
            <TextField
              defaultValue="Default Title"
              hintText="Title"
              onChange={(event, newValue) => this.handleChange(event, newValue)}
              name="title"
              fullWidth={true}
            />
            <TextField
            defaultValue="Default Description"
              hintText="Description"
              onChange={(event, newValue) => this.handleChange(event, newValue)}
              name="description"
              fullWidth={true}
            />

            <SelectField
            defaultValue={1}
              floatingLabelText="Owner"
              name="owner"
              value={this.state.owner}
              onChange={(event, key, payload) =>
                this.handleChangeOwner(event, key, payload)
              }>
              {users.map(user => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  primaryText={user.name}
                />
              ))}
            </SelectField>
          </Dialog>
        </div>
        {projects.map(project => {
          return (
            <Card key={project.id}>
              <CardTitle
                title={project.title}
                subtitle={project.owner.name}
                actAsExpander={true}
                showExpandableButton={true}
              />

              <NavLink to={`/projects/${project.id}`}>
                <FlatButton label="Go to project page" primary={true} />
              </NavLink>
              <Mutation mutation={mutationDeleteProject}>
									{(deleteProject) => <FlatButton id={project.id} label="DELETE" secondary={true} onClick={(event) => this.handleDeleteProject(event, deleteProject)} />}
								</Mutation>

              <CardText expandable={true}>
                {/* Stepper showing the status of the project */}
                <Status project={project} />
                Description:
                {project.description}
              </CardText>
            </Card>
          )
        })}
      </div>
    )
  }
}

const queryAllProjects = gql`
  {
    projects {
      tasks {
        id
        title
        status
        project {
          id
        }
        children {
          id
          title
          status
          project {
            id
          }
        }
      }
      owner {
        id
        name
      }
      id
      status
      title
      description
    }
    users {
      id
      name
    }
  }
`

export default graphql(queryAllProjects)(ProjectList)
