describe('Root endpoint', () => {
	let api;

	beforeEach(() => {
		resetTestDB();
	});

	beforeAll(() => {
		api = app.listen(3000, () => console.log('Test server running on port 3000'));
	});

	afterAll(async () => {
		console.log('Gracefully stopping test server');
		await api.close();
	});

	it('GET to / returns message Hello world!', () => {});

	it('Should return all rooms', async () => {
		const res = await request(api).get('/rooms');
		expect(res.body).toHaveLength(1);
	});
});
