import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const style = {
	margin: 12
};

const mutationDeleteUser = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id)
	}
`;

const mutationCreateUser = gql`
	mutation CreateUser($name: String!, $email: String!) {
		createUser(name: $name, email: $email) {
			id
		}
	}
`;

const mutationUpdateUser = gql`
	mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
		updateUser(id: $id, name: $name, email: $email) {
			id
		}
	}
`;

class PeopleList extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			openEdit: false,
			name: 'Default Name',
			email: 'defaultemail@email.com',
			userSelected: ''
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleOpenEdit = (event) => {
		this.setState({ openEdit: true, userSelected: event.currentTarget.id });
	};

	handleDeleteUser = async (event, deleteUser) => {
		await this.setState({ userSelected: event.currentTarget.id });
		deleteUser({
			variables: {
				id: this.state.userSelected
			}
		});
		this.props.data.refetch();
	};

	handleClose = () => {
		this.setState({
			open: false,
			name: 'Default Name',
			email: 'defaultemail@email.com'
		});
	};
	handleCloseEdit = () => {
		this.setState({ openEdit: false });
	};

	handleChange = (event, newValue, payload) => {
		this.setState({
			[event.target.name]: newValue
		});
	};

	handleCreateNewUser = (createUser) => {
		createUser({
			variables: {
				name: this.state.name,
				email: this.state.email
			}
		});
		this.handleClose();
		this.props.data.refetch();
	};

	handleUpdateNewUser = (updateUser) => {
		updateUser({
			variables: {
				name: this.state.name,
				email: this.state.email,
				id: this.state.userSelected
			}
		});
		this.setState({
			name: 'Default Name',
			email: 'defaultemail@email.com'
		});
		this.handleCloseEdit();
		this.props.data.refetch();
	};

	render() {
		const users = this.props.data.users || [];
		const actions = [
			<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
			<Mutation mutation={mutationCreateUser}>
				{(createUser) => (
					<FlatButton label="Submit" primary={true} onClick={() => this.handleCreateNewUser(createUser)} />
				)}
			</Mutation>
		];

		const actionsEdit = [
			<FlatButton label="Cancel" primary={true} onClick={this.handleCloseEdit} />,
			<Mutation mutation={mutationUpdateUser}>
				{(updateUser) => (
					<FlatButton label="Submit" primary={true} onClick={() => this.handleUpdateNewUser(updateUser)} />
				)}
			</Mutation>
		];
		return (
			<div className="card-display">
				<RaisedButton label="ADD NEW USER" style={style} primary={true} onClick={this.handleOpen} />

				<Dialog
					contentStyle={{ width: '25%', maxWidth: 'none' }}
					title="New User"
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<div>
						<TextField
							value={this.state.name}
							onChange={(event, newValue) => this.handleChange(event, newValue)}
							name="name"
							hintText="Name"
						/>
					</div>
					<div>
						<TextField
							value={this.state.email}
							onChange={(event, newValue) => this.handleChange(event, newValue)}
							name="email"
							hintText="Email"
						/>
					</div>
				</Dialog>
				<Dialog title="Edit User" actions={actionsEdit} modal={true} open={this.state.openEdit}>
					<div>
						<TextField
							onChange={(event, newValue) => this.handleChange(event, newValue)}
							name="name"
							hintText="Name"
						/>
					</div>
					<div>
						<TextField
							onChange={(event, newValue) => this.handleChange(event, newValue)}
							name="email"
							hintText="Email"
						/>
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
							<CardActions>
								<FlatButton id={user.id} label="EDIT" primary={true} onClick={this.handleOpenEdit} />
								<Mutation mutation={mutationDeleteUser}>
									{(deleteUser) => (
										<FlatButton
											id={user.id}
											label="DELETE"
											secondary={true}
											onClick={(event) => this.handleDeleteUser(event, deleteUser)}
										/>
									)}
								</Mutation>
							</CardActions>
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
