const SessionController = require("../../src/controllers/session-ctrl");
const EmailValidator = require("../../src/utils/email-validator");
const UserService = require("../../src/services/user-service");
const SessionService = require("../../src/services/session-service");
const httpMocks = require('node-mocks-http');

jest.mock("../../src/utils/email-validator");
jest.mock("../../src/services/user-service");
jest.mock("../../src/services/session-service");

describe('SessionController.create', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        jest.clearAllMocks();
    });

    test('should create a session for valid email and password', async () => {
        req.body = { email: 'valid@example.com', password: 'password' };
        EmailValidator.isValid.mockReturnValue(true);
        UserService.userExistsAndCheckPassword.mockResolvedValue(true);
        SessionService.generateToken.mockResolvedValue('token');

        await SessionController.create(req, res);

        expect(EmailValidator.isValid).toHaveBeenCalledWith('valid@example.com');
        expect(UserService.userExistsAndCheckPassword).toHaveBeenCalledWith({
            email: 'valid@example.com',
            password: 'password'
        });
        expect(SessionService.generateToken).toHaveBeenCalledWith({ email: 'valid@example.com' });
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toHaveProperty('token');
    });

    test('should throw an error for invalid email', async () => {
        req.body = { email: 'invalid', password: 'password' };
        EmailValidator.isValid.mockReturnValue(false);

        await SessionController.create(req, res);

        expect(res.statusCode).toBe(400);
        expect(JSON.parse(res._getData())).toBe('Email inválido');
    });

    test('should throw an error for missing password', async () => {
        req.body = { email: 'valid@example.com', password: '' };
        EmailValidator.isValid.mockReturnValue(true);

        await SessionController.create(req, res);

        expect(res.statusCode).toBe(400);
        expect(JSON.parse(res._getData())).toBe('Senha inválida');
    });


    test('should throw an error if user not found', async () => {
        req.body = { email: 'notfound@example.com', password: 'password' };
        EmailValidator.isValid.mockReturnValue(true);
        UserService.userExistsAndCheckPassword.mockResolvedValue(false);

        await SessionController.create(req, res);

        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res._getData())).toBe('Usuário não encontrado');
    });
});


