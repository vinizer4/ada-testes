const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const authMiddleware = require('../../src/middlewares/auth');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    let mockRequest, mockResponse, nextFunction;
    const testSecretKey = 'myTestSecretKey123!';

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
        nextFunction = jest.fn();
        process.env.SECRET_KEY = testSecretKey;
    });

    test('should return 401 if no token is provided', () => {
        authMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.statusCode).toBe(401);
        expect(mockResponse._getJSONData()).toHaveProperty('message', 'Token is not provided');
    });

    test('should call next if token is valid', async () => {
        mockRequest.headers.authorization = 'Bearer validtoken';
        jwt.verify.mockResolvedValue({ email: 'test@example.com' });

        await authMiddleware(mockRequest, mockResponse, nextFunction);

        expect(jwt.verify).toHaveBeenCalledWith('validtoken', testSecretKey);
        expect(mockRequest).toHaveProperty('userEmail', 'test@example.com');
        expect(nextFunction).toHaveBeenCalled();
    });

    test('should return 401 if token is invalid', async () => {
        mockRequest.headers.authorization = 'Bearer invalidtoken';
        jwt.verify.mockRejectedValue(new Error('Invalid token'));

        await authMiddleware(mockRequest, mockResponse, nextFunction);

        expect(jwt.verify).toHaveBeenCalledWith('invalidtoken', testSecretKey);
        expect(mockResponse.statusCode).toBe(401);
        expect(mockResponse._getJSONData()).toHaveProperty('message', 'Invalid token');
    });
});
