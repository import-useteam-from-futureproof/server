import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function App() {
	return (
		<>
			<Switch>
				<Route path="/">
					<h1>Hello world!</h1>
				</Route>
			</Switch>
		</>
	);
}
