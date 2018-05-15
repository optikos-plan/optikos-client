import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const mutationDeleteTask = gql`
	mutation deleteTask($id: ID!) {
		deleteTask(id: $id) {
			id
		}
	}
`;

const deleteTask = (props) => {
	return (
		<Mutation mutation={mutationDeleteTask}>
			{(delTask) => (
				<div
					style={{ "width": '100%', "height": '100%', "outline": "none" }}
					tabIndex="1"
					onKeyDown={async (event) => {
            if (event.keyCode === 8) {
              await delTask({
                variables: {
                  id: props.id
                }
              });
            }
					}}
				/>
			)}
		</Mutation>
	);
};

export default deleteTask;
