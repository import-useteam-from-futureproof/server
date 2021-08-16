import React, { useState } from 'react';

// Components //
import { Header, LoginForm } from '../../components';

const LandingPage = () => {
	const [signupOpen, setSignupOpen] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(e);
		return;
	};

	return (
		<>
			<Header />
			<LoginForm handleLogin={handleLogin} />
		</>
	);
};

export default LandingPage;
