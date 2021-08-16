import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Profile } from './pages';

// Pages //
import { LandingPage } from './pages';

export default function App() {
	return (
		<>
			<Switch>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/">
					<LandingPage />
				</Route>
			</Switch>
		</>
	);
}
