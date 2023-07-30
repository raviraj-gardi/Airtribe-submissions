const express = require('express');

const { InfoController } = require('../../controllers');
const TaskRoutes = require('./task-routes')

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/tasks',TaskRoutes);

module.exports = router;