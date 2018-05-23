import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<CircularProgress size={200} />
			<h3 style={{ position: 'relative' }}>Loading...</h3>
		</div>
	);
};

export default Loading;
