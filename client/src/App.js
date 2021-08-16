import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Profile } from './pages';

export default function App() {
	return (
		<>
			<Switch>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/">
					<h1>Hello world!</h1>
				</Route>
			</Switch>
		</>
	);
}
