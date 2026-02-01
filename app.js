const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const { apiLimiter } = require('./middlewares/rateLimiter');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(apiLimiter);

app.use(express.json());

app.use(logger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'GlowUp API Docs',
}));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    errors: null,
  });
});

app.use(errorHandler);

module.exports = app;