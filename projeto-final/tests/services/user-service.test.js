const User = require('../../src/schemas/User');
const UserService = require('../../src/services/user-service');

jest.mock('../../src/schemas/User');

describe('UserService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        test('should create a new user and return its id', async () => {
            const mockUser = { id: '123' };
            User.create.mockResolvedValue(mockUser);

            const userData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
            const createdUser = await UserService.createUser(userData);

            expect(User.create).toHaveBeenCalledWith(userData);
            expect(createdUser).toHaveProperty('id', mockUser.id);
        });
    });

    describe('userExistsAndCheckPassword', () => {
        test('should return true if user exists and password matches', async () => {
            const mockUser = { email: 'john@example.com', password: 'password' };
            User.findOne.mockResolvedValue(mockUser);

            const result = await UserService.userExistsAndCheckPassword({ email: 'john@example.com', password: 'password' });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(result).toBe(true);
        });

        test('should throw an error if passwords do not match', async () => {
            const mockUser = { email: 'john@example.com', password: 'wrongPassword' };
            User.findOne.mockResolvedValue(mockUser);

            await expect(UserService.userExistsAndCheckPassword({ email: 'john@example.com', password: 'password' }))
                .rejects.toEqual({ status: 400, message: 'As senhas não batem' });
        });

        test('should return false if user does not exist', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await UserService.userExistsAndCheckPassword({ email: 'john@example.com', password: 'password' });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
            expect(result).toBe(false);
        });
    });
});
