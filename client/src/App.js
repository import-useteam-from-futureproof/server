import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages //
import { LandingPage } from './pages';

export default function App() {
	return (
		<>
			<Switch>
				<Route path="/">
					<LandingPage />
				</Route>
			</Switch>
		</>
	);
}
