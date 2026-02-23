const validateWithJoi = require('../../../middlewares/validateWithJoi');
const Joi = require('joi');

const testSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
});

describe('validateWithJoi middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should call next() when body is valid', () => {
        req.body = { name: 'Test User', email: 'test@example.com' };

        const middleware = validateWithJoi(testSchema);
        middleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 when required field is missing', () => {
        req.body = { name: 'Test User' };

        const middleware = validateWithJoi(testSchema);
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
        }));
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 when email is invalid', () => {
        req.body = { name: 'Test User', email: 'not-an-email' };

        const middleware = validateWithJoi(testSchema);
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });

    it('should strip unknown fields from req.body', () => {
        req.body = { name: 'Test User', email: 'test@example.com', unknown: 'field' };

        const middleware = validateWithJoi(testSchema);
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.body.unknown).toBeUndefined();
    });

    it('should collect all validation errors when abortEarly is false', () => {
        req.body = {};

        const middleware = validateWithJoi(testSchema);
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        const jsonArg = res.json.mock.calls[0][0];
        expect(jsonArg.message).toContain('"name"');
        expect(jsonArg.message).toContain('"email"');
    });
});
