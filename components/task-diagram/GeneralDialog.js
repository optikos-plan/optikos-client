import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import NodeAssigneeList from './NodeAssigneeList';

import UpdateTitle from './mutations/updateTitle';
import UpdateStatus from './mutations/updateStatus';
import DatePicker from './mutations/calendar';

const GenDialog = (props) => {
	const { handleChange, task, title, dueDate, closeDialog, showGenDialog, assignee, status } = props;

	const actions = [ <FlatButton key={1} label="OK" primary={true} onClick={closeDialog} /> ];
	// return Dialog component
	return (
		<Dialog
    contentStyle={{width:"25%", maxWidth: "none"}}
			title={`Task's Overview`}
			actions={actions}
			modal={true}
			open={showGenDialog}
			autoScrollBodyContent={true}
		>
			<UpdateTitle handleChange={handleChange} task={task} title={title} />

			<UpdateStatus handleChange={handleChange} task={task} status={status} />

			<DatePicker task={task} dueDate={dueDate} handleChange={handleChange} />

			<NodeAssigneeList handleChange={handleChange} assignee={assignee} task={task} />
		</Dialog>
	);
};

export default GenDialog;
