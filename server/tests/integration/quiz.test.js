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
			category: 9,
			difficulty: 'easy',
		});
		const id = res.body;
		expect(res.statusCode).toBe(201);
		const getQuiz = await request(api).get(`/quiz/${id}`);
		expect(getQuiz.body.difficulty).toBe('easy');
		expect(getQuiz.body.questions).toHaveLength(10);
	});
	//potential
	// it('Should update scores array on patch request', async () => {

	// });
});
