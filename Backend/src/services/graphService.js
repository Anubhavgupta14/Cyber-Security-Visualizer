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

exports.getGraphs = async (searchParams = {}) => {
  try {
    const query = {};
    
    if (searchParams.search) {
      query.$or = [
        { 'agents.name': { $regex: searchParams.search, $options: 'i' } },
        { 'agents.tools.name': { $regex: searchParams.search, $options: 'i' } }
      ];
    }

    return await Graph.find(query)
      .sort({ timestamp: -1 })
      .exec();
      
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

exports.updateAgent = async (agentId, updateData) => {
  try {
    const graph = await Graph.findOneAndUpdate(
      { 'agents._id': agentId },
      {
        $set: {
          'agents.$.name': updateData.name,
          'agents.$.output': updateData.output,
        }
      },
      { new: true }
    );
    return graph;
  } catch (error) {
    logger.error('Error updating agent:', error);
    throw error;
  }
};

exports.updateTool = async (toolId, updateData) => {
  try {
    const graph = await Graph.findOneAndUpdate(
      { 'agents.tools._id': toolId },
      {
        $set: {
          'agents.$[].tools.$[tool].name': updateData.name,
          'agents.$[].tools.$[tool].input': updateData.input,
          'agents.$[].tools.$[tool].output': updateData.output,
        }
      },
      {
        arrayFilters: [{ 'tool._id': toolId }],
        new: true
      }
    );
    return graph;
  } catch (error) {
    logger.error('Error updating tool:', error);
    throw error;
  }
};