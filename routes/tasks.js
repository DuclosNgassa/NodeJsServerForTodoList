const express = require("express");

const router = express.Router();

const Todo = require('./models/Todo');
const Task = require('./models/Task');

//Insert a Task
router.post('/', async (req, res, next) => {
    let { name, todoid, isfinished } = req.body;
    console.log(req.body);
    try {
        let newTask = await Task.create({
            name,
            todoid,
            isfinished
        }, {
                fields: ["name", "todoid", "isfinished"]
            });
        if (newTask) {
            res.json({
                result: 'Ok',
                data: newTask
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Insert a new Task failed'
            });

        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Task failed. Error: ${error}`
        });
    }
});

/* Update a Task */
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, todoid, isfinished } = req.body;
    try {
        let tasks = await Task.findAll({
            attributes: ['id', 'name', 'todoid', 'isfinished'],
            where: {
                id
            }
        });
        if (tasks.length > 0) {
            tasks.forEach(async (task) => {
                await task.update({
                    name: name ? name : todo.name,
                    todoid: todoid ? todoid : task.todoid,
                    isfinished: isfinished ? isfinished : task.isfinished
                });
            });
            res.json({
                result: 'Ok',
                data: tasks,
                message: 'Update a Task successfully'
            });

        } else {
            res.json({
                result: 'Failed',
                data: {},
                message: 'Error while updating a Task. $error'
            });

        }
    }
    catch (error) {
        res.json({
            result: 'Failed',
            data: {},
            message: `Error while updating a Task. ${error}`
        });

    }
});

/** Delete a Task */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        let countDeletedRows = await Task.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'Ok',
            message: `Task ${id} deleted successfully`,
            count: countDeletedRows
        })
    } catch (error) {
        res.json({
            result: 'Failed',
            data: {},
            message: `Error while deleting the Task ${id}. ${error}`
        });
    }
});

/** Get all Tasks */
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'todoid', 'isfinished'],
        });

        res.json({
            result: 'Ok',
            data: tasks,
            length: tasks.length,
            message: 'Query all Tasks successfully'
        });

    }
    catch (error) {
        res.json({
            result: 'Failed',
            data: [],
            message: `Error while fetched all Tasks. Error: ${error}`
        });
    }
});

/**Get Task by ID */
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findAll({
            attributes: ['id', 'name', 'todoid', 'isfinished'],
            where: {
                id
            }
            /* ,
             include: {
                 model: Todo
               }
               */
        });
        if (task.length > 0) {
            res.json({
                result: 'Ok',
                data: task[0],
                message: `Get Task with id: ${id} successfully`
            });
        }
        else {
            res.json({
                result: 'Ok',
                data: {},
                message: `Get Task with id: ${id} failled`

            });
        }
    } catch (error) {
        res.json({
            result: 'Ok',
            data: {},
            message: `Get Task with id: ${id} failled. Error: ${error}`
        });
    }
});

/**Get Task by ID */
router.get('/todoid/:todoid', async (req, res, next) => {
    const { todoid } = req.params;
    try {
        let tasks = await Task.findAll({
            attributes: ['id', 'name', 'todoid', 'isfinished'],
            where: {
                todoid
            }
        });

        res.json({
            result: 'Ok',
            data: tasks,
            message: `Get Task by todoid: ${todoid} successfully`
        });
    } catch (error) {
        res.json({
            result: 'Ok',
            data: {},
            message: `Get Task by Todoid: ${todoid} failled. Error: ${error}`
        });
    }
});

module.exports = router;