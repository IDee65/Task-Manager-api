const Task = require('../models/Task');
const asyncContainer = require('../middleware/async');

const getAllTasks = asyncContainer(async (req, res) => {
        const tasks = await Task.find({}) // to get all the object
        res.status(200).json({ tasks /**task:task */});
});

const createTask = asyncContainer(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task });   
});


const getTask = asyncContainer(async (req, res) => {
        const { id:taskID } = req.params;
        const task = await Task.findOne({ _id:taskID });
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`});
        }

        res.status(200).json({ task });
});

const updateTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;

        const task = await Task.findByIdAndUpdate({ _id:taskID}, req.body, {
            new: true,
            runValidators: true, //to validate parameter
        });

        if(!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}`});
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({ msg: `No task with id: ${taskID}`});
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error});
    }

};


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}