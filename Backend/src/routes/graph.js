const express = require('express');
const router = express.Router();
const graphController = require('../controllers/graphController');

router.post('/', graphController.createGraph);
router.get('/', graphController.getGraphs);
router.get('/:id', graphController.getGraphById);
router.put('/:graphId/nodes/:agentId', graphController.updateNode);

module.exports = router;