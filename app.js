const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/notFound')


//middleware
app.use(express.json());

//routes

app.use('/api/v1/tasks', tasks);

//app.get('/api/v1/tasks')                  -get all tasks
//app.post('/api/v1/tasks')                 -create all tasks
//app.get('/api/v1/tasks/:id')              -get single task
//app.patch('/api/v1/tasks/:id')            -update tasks
//app.delete('/api/v1/tasks/:id')           -get all tasks

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


