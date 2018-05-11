import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Sidebar extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { taskSelected, task, taskCompleted, updateTaskCompleted, allTasks } = this.props;
		if (taskSelected) {
			return (
				<div className="sidenav">
					<h4>{task.title}</h4>
					<p>Status: {task.status} </p>
					<Checkbox
						label="Completed"
						checked={taskCompleted}
						onCheck={updateTaskCompleted}
						style={styles.checkbox}
						labelStyle={styles.label}
						iconStyle={{ fill: '#424242' }}
					/>
					<p>Deadline: {task.endDate}</p>
					<DatePicker
						hintText="Set deadline"
						underlineStyle={{ display: 'none' }}
						hintStyle={{ color: '#424242' }}
					/>
					<TextField
						hintStyle={{ color: '#424242' }}
						hintText="Set owner"
						underlineStyle={{ display: 'none' }}
					/>
					<br />
					<p>Description: {task.description} </p>
					<TextField
						inputStyle={{ color: '#424242' }}
						hintStyle={{ color: '#424242' }}
						underlineStyle={{ display: 'none' }}
						hintText="Enter comments"
						multiLine={true}
						rows={1}
						rowsMax={4}
					/>
					<br />
					<br />
					<div>
						<RaisedButton label="SUBMIT" primary={true} />
					</div>
				</div>
			);
		} else {
			return (
				<div className="sidenav">
					<List>
						<ListItem style={{ color: '#424242' }} primaryText="Completed Tasks" />
						{allTasks.map((task) => {
							if (task.status === 'completed')
								return (
									<ListItem
										key={task.id}
										style={{ color: '#424242', fontSize: '12px' }}
										primaryText={task.title}
									/>
								);
						})}
					</List>
					<Divider />
					<List>
						<ListItem style={{ color: '#424242' }} primaryText="Current Tasks" />
            {allTasks.map((task) => {
							if (task.status === 'current')
								return (
									<ListItem
										key={task.id}
										style={{ color: '#424242', fontSize: '12px' }}
										primaryText={task.title}
									/>
								);
						})}
					</List>
					<Divider />
					<List>
						<ListItem style={{ color: '#424242' }} primaryText="Future Tasks" />
            {allTasks.map((task) => {
							if (task.status === 'pending')
								return (
									<ListItem
										key={task.id}
										style={{ color: '#424242', fontSize: '12px' }}
										primaryText={task.title}
									/>
								);
						})}
					</List>
				</div>
			);
		}
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
