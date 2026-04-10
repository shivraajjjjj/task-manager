require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const TaskRoutes = require('./routes/taskRoutes.js');
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/task', TaskRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});