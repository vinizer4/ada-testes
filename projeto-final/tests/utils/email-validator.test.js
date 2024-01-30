const Email = require('../../src/utils/email-validator');

describe('Email Validator', () => {
    test('should return true for a valid email', () => {
        expect(Email.isValid('example@example.com')).toBe(true);
        expect(Email.isValid('user.name@domain.co')).toBe(true);
        expect(Email.isValid('user-name@domain.co')).toBe(true);
    });

    test('should return false for an invalid email', () => {
        expect(Email.isValid('example')).toBe(false);
        expect(Email.isValid('example@')).toBe(false);
        expect(Email.isValid('example@domain')).toBe(false);
        expect(Email.isValid('@domain.com')).toBe(false);
        expect(Email.isValid('user@domain..com')).toBe(false);
    });

    test('should return false for null or empty string', () => {
        expect(Email.isValid(null)).toBe(false);
        expect(Email.isValid('')).toBe(false);
    });
});
