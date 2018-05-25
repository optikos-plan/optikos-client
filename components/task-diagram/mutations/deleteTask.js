import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';

const mutationDeleteTask = gql`
	mutation deleteTask($id: ID!) {
		deleteTask(id: $id)
	}
`;

const deleteTask = (props) => {
	return (
		// <Mutation mutation={mutationDeleteTask}>
		//   {delTask => (
		//     <div
		//       style={{ width: '100%', height: '100%', outline: 'none' }}
		//       tabIndex="1"
		//       onKeyDown={async event => {
		//         if (event.keyCode === 8) {
		//           console.log('HERE!')
		//           await delTask({
		//             variables: {
		//               id: props.id
		//             }
		//           })
		//           console.log('stuff is being deleted')
		//         }
		//       }}
		//     />
		//   )}
		// </Mutation>
		<Mutation mutation={mutationDeleteTask}>
			{(delTask) => (
				<RaisedButton
					style={{ margin: '10px' }}
					secondary={true}
					label="DELETE SELECTED TASK"
					onClick={async () => {
						await delTask({
							variables: {
								id: props.id
							}
						});
						props.deleteTask();
					}}
				/>
			)}
		</Mutation>
	);
};

export default deleteTask;
