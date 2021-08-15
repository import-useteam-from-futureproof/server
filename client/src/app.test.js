import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
	test('it renders a h1', () => {
		render(<App />, { wrapper: MemoryRouter });
		const header = screen.getByRole('heading');
		expect(header).toBeInTheDocument();
	});
});
