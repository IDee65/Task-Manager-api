const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();


//middleware
app.use(express.json());

//routes

app.use('/api/v1/tasks', tasks);


const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server started on port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
}

start();


