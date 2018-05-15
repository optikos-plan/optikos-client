import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment'

class Sidebar extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { taskSelected, task, taskCompleted, updateTaskCompleted, allTasks } = this.props;
		console.log("all tasks", allTasks)
		const sortedTasks = allTasks.slice(0).sort((a,b) => new Date(a.endDate) - new Date(b.endDate))

			return (
				<div className="sidenav">
					<List>
						<ListItem style={{ color: '#424242' }} primaryText="Completed Tasks" />
						{sortedTasks.map((task) => {
							if (task.status === 'COMPLETED')
								return (
									<ListItem
										key={task.id}
										style={{ color: '#424242', fontSize: '12px' }}
										primaryText={task.title}
										secondaryText={moment(task.endDate).format('MMM Do YYYY')}
									/>
								);
						})}
					</List>
					<Divider />
					<List>
						<ListItem style={{ color: '#424242' }} primaryText="Current Tasks" />
						{sortedTasks.map((task) => {
							if (task.status === 'IN_PROGRESS')
								return (
									<ListItem
										key={task.id}
										style={{ color: '#424242', fontSize: '12px' }}
										primaryText={task.title}
										secondaryText={"Due: "+moment(task.endDate).format('MMM Do YYYY')}
									/>
								);
						})}
					</List>
					<Divider />
					<List>
						<ListItem style={{ color: '#424242' }} primaryText="Future Tasks" />
						{sortedTasks.map((task) => {
							if (task.status === 'ASSIGNED')
								return (
									<ListItem
										key={task.id}
										style={{ color: '#424242', fontSize: '12px' }}
										primaryText={task.title}
										secondaryText={"Due: "+moment(task.endDate).format('MMM Do YYYY')}
									/>
								);
						})}
					</List>
				</div>
			);
		}
	}


const styles = {
	block: {
		maxWidth: 250
	},
	checkbox: {
		marginBottom: 16
	},
	label: {
		color: '#424242'
	}
};

export default Sidebar;
