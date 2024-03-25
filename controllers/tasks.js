const Task = require('../models/Task');
const asyncContainer = require('../middleware/async');
const { apiErrors } = require('../errors/errors');

const getAllTasks = asyncContainer(async (req, res) => {
        const tasks = await Task.find({}) // to get all the object
        res.status(200).json({ tasks /**task:task */});
});

const createTask = asyncContainer(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task });   
});


const getTask = asyncContainer(async (req, res, next) => {
        const { id:taskID } = req.params;
        const task = await Task.findOne({ _id:taskID });
        if(!task){
            return next(apiErrors(`No task with id : ${taskID}`, 404));
            // return res.status(404).json({msg:`No task with id : ${taskID}`});
        }

        res.status(200).json({ task });
});

const updateTask = asyncContainer(async (req, res) => {
        const {id:taskID} = req.params;

        const task = await Task.findByIdAndUpdate({ _id:taskID}, req.body, {
            new: true,
            runValidators: true, //to validate parameter
        });

        if(!task) {
            return next(apiErrors(`No task with id : ${taskID}`, 404));
            // return res.status(404).json({ msg: `No task with id : ${taskID}`});
        }

        res.status(200).json({ task });
});

const deleteTask = asyncContainer( async (req, res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(apiErrors(`No task with id : ${taskID}`, 404));
            // return res.status(404).json({ msg: `No task with id: ${taskID}`});
        }

        res.status(200).json(task);
});


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}