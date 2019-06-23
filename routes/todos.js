const express = require("express");

const router = express.Router();

const Todo = require('./models/Todo');
const Task = require('./models/Task');

//Insert a Todo
router.post('/', async (req, res, next) => {
    let { name, priority, description, duedate } = req.body;
    console.log(req.body);
    try {
        let newTodo = await Todo.create({
            name,
            priority: parseInt(priority),
            description,
            duedate
        }, {
                fields: ["name", "priority", "description", "duedate"]
            });
        if (newTodo) {
            res.json({
                result: 'Ok',
                data: newTodo
            });
        } else {
            res.json({
                result: 'failed',
                data: {},
                message: 'Insert a new Todo failed'
            });

        }
    } catch (error) {
        res.json({
            result: 'failed',
            data: {},
            message: `Insert a new Todo failed. Error: ${error}`
        });
    }
});

/* Update a Todo */
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, priority, description, duedate } = req.body;
    try {
        let todos = await Todo.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'duedate'],
            where: {
                id
            }
        });
        if (todos.length > 0) {
            todos.forEach(async (todo) => {
                await todo.update({
                    name: name ? name : todo.name,
                    priority: priority ? priority : todo.priority,
                    description: description ? description : todo.description,
                    duedate: duedate ? duedate : todo.duedate
                });
            });
            res.json({
                result: 'Ok',
                data: todos,
                message: 'Update a Todo successfully'
            });

        } else {
            res.json({
                result: 'Failed',
                data: {},
                message: 'Error while updating a Todo. $error'
            });

        }
    }
    catch (error) {
        res.json({
            result: 'Failed',
            data: {},
            message: `Error while updating a Todo. ${error}`
        });

    }
});

/** Delete a Todo */
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Task.destroy({
            where: {
                todoid: id
            }
        });
        let countDeletedRows = await Todo.destroy({
            where: {
                id
            }
        });
        res.json({
            result: 'Ok',
            message: `Todo ${id} deleted successfully`,
            count: countDeletedRows
        })
    } catch (error) {
        res.json({
            result: 'Failed',
            data: {},
            message: `Error while deleting the Todo ${id}. ${error}`
        });
    }
});

/** Get a Todo by Id */
router.get('/', async (req, res, next) => {
    try {
        const todos = await Todo.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'duedate'],
        });

        res.json({
            result: 'Ok',
            data: todos,
            length: todos.length,
            message: 'Query all Todos successfully'
        });

    }
    catch (error) {
        res.json({
            result: 'Failed',
            data: [],
            message: `Error while fetched all todos. Error: ${erro}`
        });
    }
});

/**Get Todo by ID */

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findAll({
            attributes: ['name', 'priority', 'description', 'duedate'],
            where: {
                id
            },
            include: {
                model: Task
              }
        });
        if (todo.length > 0) {
            res.json({
                result: 'Ok',
                data: todo[0],
                message: `Get Todo with id: ${id} successfully`
            });
        }
        else {
            res.json({
                result: 'Ok',
                data: {},
                message: `Get Todo with id: ${id} failled`

            });
        }
    } catch (error) {
        res.json({
            result: 'Ok',
            data: {},
            message: `Get Todo with id: ${id} failled. Error: ${error}`
        });
    }
});

module.exports = router;