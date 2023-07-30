const express = require('express');

const { InfoController } = require('../../controllers');
const {createTask,deleteTask, getAllTasks, getTaskById,updateTask,getTasksByPriority} = require('../../controllers/controller')
const {Middlewares} = require('../../middlewares')


const router = express.Router();
router.post('/', Middlewares.validateCreateRequest,createTask);
router.delete('/:id',deleteTask);
router.get('/',getAllTasks);
router.get('/:id',getTaskById);
router.put('/:id',Middlewares.validateUpdateRequest,updateTask);

router.get('/priority/:level',TaskMiddlewares.validatePriorityRequest,getTasksByPriority);

module.exports = router;