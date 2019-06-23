const Sequelize = require('sequelize');
const sequelize = require('../databases/database').sequelize;
const Op = require('../databases/database').Op;

const Task = sequelize.define('task',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING
    },
    todoid:{
        type: Sequelize.INTEGER
    },
    isfinished:{
        type: Sequelize.BOOLEAN
    }
},{
    // don´t add the timestamp attributes (updatedAt,  createdAt)
    timestamps: false,
});

module.exports = Task;