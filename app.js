const express = require('express');

const app = express();
app.use(express.json());

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

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