import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { graphql, Mutation } from "react-apollo";
import gql from "graphql-tag";

const style = {
  margin: 12
};

const customContentStyle = {
  width: "60%",
  maxWidth: "none"
};

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
`;

class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      owner: "1",
      title: "This Title",
      description: "this is the description"
    };
  }

  handleChange = (event, newValue, payload) => {
    this.setState({
      [event.target.name]: newValue
    });
  };

  handleChangeOwner = (event, _ , payload) => {
    this.setState({
      owner: payload
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCreateNewProject = createProject => {
    createProject({
      variables: {
        owner: this.state.owner,
        title: this.state.title,
        description: this.state.description,
        status: this.state.CompletionStatus,
        tasks: this.state.tasks
      }
    });
    this.handleClose();
  };

  render() {
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
    ];

    const { projects, loading, error, users } = this.props.data;
    console.log(this.props.data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div className="card-display">
        <div>
          <RaisedButton
            label="CREATE NEW PROJECT"
            onClick={this.handleOpen}
            style={style}
            primary={true}
          />
          <Dialog
            title="Create New Project Details:"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
          >
            <TextField
              hintText="Title"
              onChange={(event, newValue) => this.handleChange(event, newValue)}
              name="title"
              fullWidth={true}
            />
            <TextField
              hintText="Description"
              onChange={(event, newValue) => this.handleChange(event, newValue)}
              name="description"
              fullWidth={true}
            />

            <SelectField
              floatingLabelText="Owner"
              name="owner"
              value={this.state.owner}
              onChange={(event, key, payload) => this.handleChangeOwner(event, key, payload)}
            >

                {users.map(user => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                    primaryText={user.name}
                  />
                ))}

            </SelectField>

            {/* <TextField hintText="Owner" onChange={(event, newValue) => this.handleChange(event, newValue)} name="owner" fullWidth={true} /> */}
          </Dialog>
        </div>
        {projects.map(project => {
          return (
            <Card key={project.id}>
              <CardHeader
                title={project.title}
                subtitle={project.owner.name}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                Description:
                {project.description}
              </CardText>
            </Card>
          );
        })}
      </div>
    );
  }
}

const queryAllProjects = gql`
  {
    projects {
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
`;

export default graphql(queryAllProjects)(ProjectList);
