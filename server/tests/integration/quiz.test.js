describe('Quiz endpoints', () => {
	let api;

	beforeEach(async () => {
		await resetTestDB();
	});

	beforeAll(() => {
		api = app.listen(3000, () => console.log('Test server running on port 3000'));
	});

	afterAll(async () => {
		console.log('Gracefully stopping test server');
		await api.close();
	});

	it('Should create a quiz on valid post request', async () => {
		const res = await request(api).post('/quiz').send({
			room_id: 3,
			num_questions: 10,
			category: 'Music',
			difficulty: 'Easy',
		});
		const id = res.body;

		expect(res.body).toBe(1);
	});
});
