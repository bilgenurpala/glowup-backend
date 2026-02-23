require('dotenv').config({ override: true });

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err?.message || err);
});

process.on('exit', (code) => {
  console.error('PROCESS EXITING with code:', code);
});

const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('SERVER ERROR:', err.message);
});
