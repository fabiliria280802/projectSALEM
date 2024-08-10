const userController = require('../../controllers/userController');
const {
	getSharePointData,
	addSharePointData,
	updateSharePointData,
	deleteSharePointData,
} = require('../../services/sharePointService');

jest.mock('../../services/sharePointService');

describe('UserController', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return users on getUsers', async () => {
		const req = {};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		const users = [
			{ id: '1', username: 'user1', role: 'admin' },
			{ id: '2', username: 'user2', role: 'user' },
		];

		getSharePointData.mockResolvedValue(users);

		await userController.getUsers(req, res);

		expect(getSharePointData).toHaveBeenCalledWith(
			process.env.SHAREPOINT_SITE_URL,
			'Users',
			process.env.SHAREPOINT_ACCESS_TOKEN,
		);
		expect(res.json).toHaveBeenCalledWith(users);
	});

	it('should create a user on createUser', async () => {
		const req = {
			body: {
				username: 'newuser',
				password: 'newpassword',
				role: 'user',
			},
		};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		const newUser = {
			id: '123',
			username: 'newuser',
			password: 'hashedpassword',
			role: 'user',
		};

		addSharePointData.mockResolvedValue(newUser);

		await userController.createUser(req, res);

		expect(addSharePointData).toHaveBeenCalledWith(
			process.env.SHAREPOINT_SITE_URL,
			'Users',
			expect.objectContaining({ username: 'newuser', role: 'user' }),
			process.env.SHAREPOINT_ACCESS_TOKEN,
		);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(newUser);
	});

	it('should update a user on updateUser', async () => {
		const req = {
			params: { id: '123' },
			body: {
				username: 'updateduser',
				password: 'updatedpassword',
				role: 'admin',
			},
		};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		updateSharePointData.mockResolvedValue(true);

		await userController.updateUser(req, res);

		expect(updateSharePointData).toHaveBeenCalledWith(
			process.env.SHAREPOINT_SITE_URL,
			'Users',
			'123',
			expect.objectContaining({ username: 'updateduser', role: 'admin' }),
			process.env.SHAREPOINT_ACCESS_TOKEN,
		);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Usuario actualizado correctamente',
		});
	});

	it('should delete a user on deleteUser', async () => {
		const req = {
			params: { id: '123' },
		};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		deleteSharePointData.mockResolvedValue(true);

		await userController.deleteUser(req, res);

		expect(deleteSharePointData).toHaveBeenCalledWith(
			process.env.SHAREPOINT_SITE_URL,
			'Users',
			'123',
			process.env.SHAREPOINT_ACCESS_TOKEN,
		);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Usuario eliminado correctamente',
		});
	});

	it('should return 500 if there is an error during getUsers', async () => {
		const req = {};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		getSharePointData.mockRejectedValue(new Error('Error fetching data'));

		await userController.getUsers(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Error al obtener usuarios',
			error: 'Error fetching data',
		});
	});

	it('should return 500 if there is an error during createUser', async () => {
		const req = {
			body: {
				username: 'newuser',
				password: 'newpassword',
				role: 'user',
			},
		};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		addSharePointData.mockRejectedValue(new Error('Error adding data'));

		await userController.createUser(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Error al crear usuario',
			error: 'Error adding data',
		});
	});

	it('should return 500 if there is an error during updateUser', async () => {
		const req = {
			params: { id: '123' },
			body: {
				username: 'updateduser',
				password: 'updatedpassword',
				role: 'admin',
			},
		};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		updateSharePointData.mockRejectedValue(new Error('Error updating data'));

		await userController.updateUser(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Error al actualizar usuario',
			error: 'Error updating data',
		});
	});

	it('should return 500 if there is an error during deleteUser', async () => {
		const req = {
			params: { id: '123' },
		};
		const res = {
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};

		deleteSharePointData.mockRejectedValue(new Error('Error deleting data'));

		await userController.deleteUser(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Error al eliminar usuario',
			error: 'Error deleting data',
		});
	});
});
