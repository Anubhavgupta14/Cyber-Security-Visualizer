const graphService = require('../services/graphService');
const socket = require('../config/socket');
const logger = require('../utils/logger');

exports.createGraph = async (req, res, next) => {
    try {
      console.log("Graph",req.body);
      const graphData = await graphService.createGraph(req.body);
      
      // Access io through req.app.locals
      const io = req.app.locals.io;
      if (io) {
        io.emit('graphUpdate', graphData);
      }
      
      res.status(201).json(graphData);
    } catch (error) {
      next(error);
    }
  };

  exports.getGraphs = async (req, res, next) => {
    try {
      const { search } = req.query;
      
      const searchParams = {search};
      
      const graphs = await graphService.getGraphs(searchParams);
      res.json(graphs);
    } catch (error) {
      next(error);
    }
  };

exports.getGraphById = async (req, res, next) => {
  try {
    const graph = await graphService.getGraphById(req.params.id);
    if (!graph) {
      return res.status(404).json({ message: 'Graph not found' });
    }
    res.json(graph);
  } catch (error) {
    next(error);
  }
};

exports.updateNode = async (req, res, next) => {
    try {
      const { graphId, agentId } = req.params;
      const updateData = req.body;
      
      const updatedGraph = await graphService.updateNode(graphId, agentId, updateData);
      
      if (!updatedGraph) {
        return res.status(404).json({ message: 'Graph or node not found' });
      }
  
      // Emit update event
      const io = socket.setupSocket();
      io.emit('graphUpdate', updatedGraph);
      
      res.json(updatedGraph);
    } catch (error) {
      logger.error('Error updating node:', error);
      next(error);
    }
  };