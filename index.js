const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});