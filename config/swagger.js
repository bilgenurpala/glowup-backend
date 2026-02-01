const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GlowUp Backend API',
            version: '1.0.0',
            description: 'A modern, production-ready REST API backend built with Node.js',
            contact: {
                name: 'Bilgenur Pala',
                url: 'https://github.com/bilgenurpala',
                email: 'bilgenurpala@gmail.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://api.glowup.com',
                description: 'Production server',
            },
        ],
        components: { 
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT access token',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'John Doe',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                            example: 'johndoe@example.com',
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Account creation timestamp',
                            example: '2026-02-01T12:51:00.000Z',
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update timestamp',
                            example: '2026-02-01T12:51:00.000Z',
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            example: 'Error message',
                        },
                        errors: {
                            type: 'object',
                            nullable: true,
                            example: null,
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication endpoints (register, login, refresh, logout)',
            },
            {
                name: 'Users',
                description: 'User management endpoints (CRUD operations)',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;