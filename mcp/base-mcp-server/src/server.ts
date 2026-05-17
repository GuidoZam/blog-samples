#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getRandomUser } from './tools/get-random-user.js';
import { getFilteredUsers } from './tools/get-filtered-users.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const MCP_ENDPOINT = '/mcp';

/**
 * Main MCP Server Implementation
 * 
 * This server exposes tools to interact with the randomuser.me API
 * via the Model Context Protocol (MCP) using Streamable HTTP transport.
 */

// Create the MCP server instance
const mcpServer = new McpServer({
  name: 'randomuser-mcp-server',
  version: '1.0.0',
});

// Log to stderr as per MCP best practices (stdout is reserved for MCP messages in stdio mode)
const log = (message: string) => {
  console.error(`[${new Date().toISOString()}] ${message}`);
};

/**
 * Register MCP tools
 */

// Register get_random_user tool
mcpServer.registerTool(
  'get_random_user',
  {
    description: 'Fetches a single random user from randomuser.me API with optional filters',
    inputSchema: {
      gender: z.enum(['male', 'female']).optional().describe('Filter by gender (optional)'),
      nat: z.string().regex(/^[A-Z]{2}$/).optional().describe('Filter by nationality using 2-letter country code (e.g., US, GB, FR)'),
    },
  },
  async (args) => {
    log(`Executing get_random_user with args: ${JSON.stringify(args)}`);
    const result = await getRandomUser(args);
    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    };
  }
);

// Register get_filtered_users tool
mcpServer.registerTool(
  'get_filtered_users',
  {
    description: 'Fetches a list of random users with various filters',
    inputSchema: {
      results: z.number().min(1).max(5000).optional().describe('Number of users to fetch (1-5000). Default: 10'),
      gender: z.enum(['male', 'female']).optional().describe('Filter by gender (optional)'),
      nat: z.string().optional().describe('Comma-separated list of nationality codes (e.g., "US,GB,FR")'),
      inc: z.string().optional().describe('Comma-separated list of fields to include (e.g., "gender,name,email")'),
      exc: z.string().optional().describe('Comma-separated list of fields to exclude (e.g., "login,registered")'),
    },
  },
  async (args) => {
    log(`Executing get_filtered_users with args: ${JSON.stringify(args)}`);
    const result = await getFilteredUsers(args);
    return {
      content: [
        {
          type: 'text',
          text: result,
        },
      ],
    };
  }
);

/**
 * Set up Express server with Streamable HTTP transport
 */

const app = express();

// Configure CORS with security considerations
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    // For development, allow localhost origins
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // In production, you should validate against a whitelist
    // For this demo, we'll allow all origins
    callback(null, true);
  },
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', server: 'randomuser-mcp-server', version: '1.0.0' });
});

// Create transport for the MCP endpoint
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => crypto.randomUUID(),
});

// Connect the MCP server to the transport
await mcpServer.connect(transport);

// Handle MCP protocol requests at the MCP endpoint
app.all(MCP_ENDPOINT, async (req, res) => {
  await transport.handleRequest(req, res, req.body);
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  log(`Express error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the HTTP server
app.listen(PORT, () => {
  log(`🚀 Randomuser MCP Server running on http://localhost:${PORT}`);
  log(`📡 MCP endpoint: http://localhost:${PORT}${MCP_ENDPOINT}`);
  log(`💡 Health check: http://localhost:${PORT}/health`);
  log(`\nServer is ready to accept MCP connections!`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  log('\nShutting down gracefully...');
  await mcpServer.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  log('\nShutting down gracefully...');
  await mcpServer.close();
  process.exit(0);
});
