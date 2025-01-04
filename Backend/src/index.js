const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { connectDB } = require('./config/database');
const { setupSocket } = require('./config/socket');
const graphRoutes = require('./routes/graph');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/graph', graphRoutes);

// Error handling
app.use(errorHandler);

// Socket.io setup
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  
  // Store io instance in app locals
  app.locals.io = io;

// Database connection
connectDB();

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});