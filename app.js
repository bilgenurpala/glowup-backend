const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { apiLimiter } = require('./middlewares/rateLimiter');

const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(apiLimiter);

app.use(express.json());

const logger = require("./middlewares/logger");
app.use(logger);

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        errors: null,
    });
});

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;