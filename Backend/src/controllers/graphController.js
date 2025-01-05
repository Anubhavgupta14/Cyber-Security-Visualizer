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

exports.updateAgent = async (req, res, next) => {
  try {
    const { agentId } = req.params;
    const updateData = req.body;
    
    const updatedGraph = await graphService.updateAgent(agentId, updateData);
    
    if (!updatedGraph) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const io = req.app.locals.io;
    if (io) {
      io.emit('graphUpdate', updatedGraph);
    }
    
    res.json(updatedGraph);
  } catch (error) {
    logger.error('Error updating agent:', error);
    next(error);
  }
};

exports.updateTool = async (req, res, next) => {
  try {
    const { toolId } = req.params;
    const updateData = req.body;
    
    const updatedGraph = await graphService.updateTool(toolId, updateData);
    
    if (!updatedGraph) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    const io = req.app.locals.io;
    if (io) {
      io.emit('graphUpdate', updatedGraph);
    }
    
    res.json(updatedGraph);
  } catch (error) {
    logger.error('Error updating tool:', error);
    next(error);
  }
};