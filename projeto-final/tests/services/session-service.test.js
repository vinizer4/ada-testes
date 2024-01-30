const jwt = require('jsonwebtoken');
const SessionService = require('../../src/services/session-service');

jest.mock('jsonwebtoken');

describe('SessionService', () => {
    const testSecretKey = 'myTestSecretKey123!';
    const testEmail = 'test@example.com';

    beforeEach(() => {
        process.env.SECRET_KEY = testSecretKey;
    });

    test('generateToken should generate a valid JWT for a given email', () => {
        const expectedToken = 'generatedToken';
        jwt.sign.mockReturnValue(expectedToken); // Mock the jwt.sign function

        const token = SessionService.generateToken({ email: testEmail });

        expect(jwt.sign).toHaveBeenCalledWith(
            { email: testEmail },
            testSecretKey,
            { expiresIn: '30s' }
        );
        expect(token).toBe(expectedToken);
    });
});
