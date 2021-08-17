describe('User endpoints', () => {
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

	it('Should create user on post request', async () => {
		const res = await request(api).post('/user').send({
			firebase_id: '9',
			username: 'anExtraTest',
		});
		expect(res.statusCode).toEqual(201);
	});
	it('Should return user information for given id', async () => {
		const finalRes = await request(api).get('/user/3');
		expect(finalRes.statusCode).toEqual(200);
		expect(finalRes.body.firebase_id).toEqual('3');
	});

	it('Adding a highscore updates user object with new highscore for given id', async () => {
		const res = await request(api).patch('/user/3/highscore/3000');
		expect(res.statusCode).toEqual(200);
		const users = await request(api).get('/user/3');
		expect(users.body.high_score).toEqual('3000');
	});

	it('Gets a list of user data, sorted by score, but only with username and score', async () => {
		const highScoreRes = await request(api).patch('/user/3/highscore/3000');
		const res = await request(api).get('/highscores');
		expect(res.body[0].username).toEqual('test');
		expect(res.body[0].high_score).toEqual('3000');
		expect(res.body).toHaveLength(1);
	});
});
