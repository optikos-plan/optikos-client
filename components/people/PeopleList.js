import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const style = {
	margin: 12
};

const mutationCreateUser = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
  ) {
    createUser(
      name: $name
      email: $email
    ) {
      id
    }
  }
`

class PeopleList extends Component {
	constructor() {
		super();
		this.state = {
      open: false,
      name: '',
      email: ''
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
  };
  
  handleChange = (event, newValue, payload) => {
    this.setState({
      [event.target.name]: newValue
    })
  }

  handleCreateNewUser = createUser => {
    createUser({
      variables: {
        name: this.state.name,
        email: this.state.email
      },
    })
    this.handleClose()
    this.props.data.refetch()
  }

	render() {
		const users = this.props.data.users || [];
		const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <Mutation mutation={mutationCreateUser}>
      {createUser => (
          <FlatButton
            label="Submit"
            primary={true}
            onClick={() => this.handleCreateNewUser(createUser)}
          />
        )}
      </Mutation>
		];
		return (
			<div className="card-display">
				<RaisedButton label="ADD NEW USER" style={style} primary={true} onClick={this.handleOpen} />
				<Dialog title="New User" actions={actions} modal={true} open={this.state.open}>
					<div>
            <TextField
            onChange={(event, newValue) => this.handleChange(event, newValue)}
            name="name"
            hintText="Name" />
					</div>
					<div>
            <TextField 
            onChange={(event, newValue) => this.handleChange(event, newValue)}
            name="email"
            hintText="Email" />
					</div>
				</Dialog>
				{users.map((user) => {
					return (
						<Card key={user.id}>
							<CardHeader
								title={user.name}
								subtitle="Owner of project"
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								<p>Email: {user.email}</p>
								Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
								pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum
								sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis
								lacus id, pellentesque lobortis odio.
							</CardText>
						</Card>
					);
				})}
			</div>
		);
	}
}

const queryAllPeople = gql`
	{
		users {
			id
			name
			email
		}
	}
`;

export default graphql(queryAllPeople)(PeopleList);
