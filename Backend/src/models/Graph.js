const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
  idx: { type: String, required: true }
});

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tools: [toolSchema],
  images: [String],
  output: { type: String, required: true },
  idx: { type: String, required: true }
});

const graphSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  idx: { type: String, required: true, unique: true },
  query: { type: String, required: true },
  agents: [agentSchema],
  response: { type: String, required: true },
  total_tokens: { type: Number, required: true },
  is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Graph', graphSchema);