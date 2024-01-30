const UserController = require('../../src/controllers/user-ctrl');
const UserService = require('../../src/services/user-service');
const EmailValidator = require('../../src/utils/email-validator');
const httpMocks = require('node-mocks-http');

jest.mock('../../src/services/user-service');
jest.mock('../../src/utils/email-validator');

describe('UserController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        jest.clearAllMocks();
    });

    describe('create', () => {
        test('should create a user with valid data', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', password: 'password' };
            EmailValidator.isValid.mockReturnValue(true);
            UserService.createUser.mockResolvedValue({ id: '123' });

            await UserController.create(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toHaveProperty('id');
        });

        test('should throw an error for invalid email', async () => {
            req.body = { name: 'John Doe', email: 'invalidemail', password: 'password' };
            EmailValidator.isValid.mockReturnValue(false);

            await UserController.create(req, res);

            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res._getData())).toBe('Email inválido');
        });

        test('should throw an error for missing password', async () => {
            req.body = { name: 'John Doe', email: 'john@example.com', password: '' };
            EmailValidator.isValid.mockReturnValue(true);

            await UserController.create(req, res);

            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res._getData())).toBe('Senha inválida');
        });
    });

    describe('changePassword', () => {
        test('should respond correctly', async () => {
            req.userEmail = 'john@example.com';

            await UserController.changePassword(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ message: 'ok' });
        });
    });
});
