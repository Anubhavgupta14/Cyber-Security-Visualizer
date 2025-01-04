const Graph = require('../models/Graph');
const logger = require('../utils/logger');

exports.createGraph = async (data) => {
  try {
    const graph = new Graph(data);
    await graph.save();
    return graph;
  } catch (error) {
    logger.error('Error creating graph:', error);
    throw error;
  }
};

exports.getGraphs = async () => {
  try {
    return await Graph.find().sort({ timestamp: -1 });
  } catch (error) {
    logger.error('Error fetching graphs:', error);
    throw error;
  }
};

exports.getGraphById = async (id) => {
  try {
    return await Graph.findById(id);
  } catch (error) {
    logger.error('Error fetching graph by id:', error);
    throw error;
  }
};

exports.updateNode = async (graphId, agentId, updateData) => {
    try {
      const graph = await Graph.findOneAndUpdate(
        {
          _id: graphId,
          'agents.idx': agentId
        },
        updateData,
        { new: true }
      );

      console.log('graph', graph);
  
      return graph;
    } catch (error) {
      logger.error('Error updating node:', error);
      throw error;
    }
  };