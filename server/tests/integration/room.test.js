describe('Room endpoints', () => {
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

	it('GET to / returns message Hello world!', () => {});

	it('Should return all rooms', async () => {
		const res = await request(api).get('/rooms');
		expect(res.body.rooms).toHaveLength(1);
	});

	it('Should return a room by a given id', async () => {
		const res = await request(api).get('/rooms');
		let oneID = res.body.rooms[0].id;
		const finalRes = await request(api).get(`/rooms/${oneID}`);
		//if object instead of array (array of objects) we have extracted one room
		expect(finalRes.body).toBeInstanceOf(Object);
	});

	it('Should add a room on post request', async () => {
		const res = await request(api).post('/rooms').send({
			name: 'test room 2',
			owner: 3,
			max_room_size: 2,
			public_room: true,
			entry_pass: '',
		});
		expect(res.statusCode).toEqual(201);
		const allRooms = await request(api).get('/rooms');
		expect(allRooms.body.rooms).toHaveLength(2);
	});

	it('Should add user id to participants of a room on join request to room id', async () => {
		const createRes = await request(api).post('/rooms').send({
			name: 'test room 2',
			owner: 3,
			max_room_size: 2,
			public_room: true,
			entry_pass: '',
		});
		const id = createRes.body;
		const res = await request(api).post(`/rooms/${id}/join/5`);
		expect(res.statusCode).toEqual(204);
		const getRes = await request(api).get(`/rooms/${id}`);
		expect(getRes.body.participants).toHaveLength(2);
	});

	it('Should remove user id from participants of a room on leave request of room id', async () => {
		const createRes = await request(api).post('/rooms').send({
			name: 'test room 2',
			owner: 3,
			max_room_size: 2,
			public_room: true,
			entry_pass: '',
		});
		const id = createRes.body;
		const res = await request(api).post(`/rooms/${id}/join/5`);
		const otherRes = await request(api).post(`/rooms/${id}/leave/5`);
		expect(otherRes.statusCode).toEqual(204);
		const getRes = await request(api).get(`/rooms/${id}`);
		expect(getRes.body.participants).toHaveLength(1);
	});
});
