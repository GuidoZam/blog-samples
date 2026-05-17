# Building an MCP Server from Scratch: A Comprehensive Tutorial

This tutorial will guide you through building a minimal but complete MCP (Model Context Protocol) server using TypeScript and the official `@modelcontextprotocol/sdk`. By the end, you'll have a working server that exposes tools to interact with the randomuser.me API.

## Table of Contents

1. [What is MCP?](#what-is-mcp)
2. [Prerequisites](#prerequisites)
3. [Understanding MCP Architecture](#understanding-mcp-architecture)
4. [Project Setup](#project-setup)
5. [Creating the Server](#creating-the-server)
6. [Implementing Tools](#implementing-tools)
7. [Transport Layer: Streamable HTTP](#transport-layer-streamable-http)
8. [Testing Your Server](#testing-your-server)
9. [Exposing Your Server via HTTPS with DevTunnel](#exposing-your-server-via-https-with-devtunnel)
10. [Using with VS Code Microsoft 365 Agents Toolkit](#using-with-vs-code-microsoft-365-agents-toolkit)
11. [Troubleshooting](#troubleshooting)
12. [Next Steps](#next-steps)

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). It enables:

- **Separation of concerns**: Context providers (servers) are separate from LLM interactions (clients)
- **Standardization**: Any MCP client can connect to any MCP server
- **Extensibility**: Servers can expose tools, resources, and prompts

### Key Concepts

- **Tools**: Functions that LLMs can call (with user approval) to perform actions
- **Resources**: File-like data that can be read by clients
- **Prompts**: Pre-written templates for common tasks
- **Transports**: How clients and servers communicate (stdio, HTTP, SSE)

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed (this tutorial uses Node.js 22)
- Basic knowledge of **TypeScript** and **async/await**
- Familiarity with **REST APIs** and **JSON-RPC**
- Understanding of **HTTP** and **Express.js** (helpful but not required)

Check your Node.js version:

```bash
node --version
```

## Understanding MCP Architecture

MCP uses JSON-RPC 2.0 for message exchange. The architecture consists of:

```
┌─────────────┐         JSON-RPC         ┌─────────────┐
│             │◄────────────────────────►│             │
│  MCP Client │      (via Transport)     │  MCP Server │
│             │                          │             │
└─────────────┘                          └─────────────┘
                                                │
                                                │ Exposes
                                                ▼
                                         ┌──────────────┐
                                         │    Tools     │
                                         │  Resources   │
                                         │   Prompts    │
                                         └──────────────┘
```

### Transport Options

1. **stdio**: For local, subprocess-based servers (used by Claude Desktop)
2. **Streamable HTTP**: For remote servers, supports both SSE streaming and direct HTTP responses
3. **HTTP+SSE**: Legacy transport (deprecated)

**For VS Code Microsoft 365 Agents Toolkit**, you must use **Streamable HTTP** transport.

## Project Setup

### Step 1: Initialize the Project

Create a new directory and initialize npm:

```bash
mkdir randomuser-mcp-server
cd randomuser-mcp-server
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install @modelcontextprotocol/sdk zod express cors dotenv
npm install -D @types/express @types/cors @types/node typescript tsx
```

**Dependency breakdown:**

- `@modelcontextprotocol/sdk`: Official MCP TypeScript SDK
- `zod`: Required peer dependency for schema validation (used by the SDK)
- `express`: HTTP server framework
- `cors`: Cross-Origin Resource Sharing middleware
- `dotenv`: Environment variable management
- `tsx`: TypeScript executor for development
- `typescript`: TypeScript compiler

### Step 3: Configure TypeScript

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "lib": ["ES2022"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Key settings:**

- `module: "NodeNext"`: Use Node.js ESM module resolution
- `target: "ES2022"`: Compile to modern JavaScript
- `strict: true`: Enable all strict type checking

### Step 4: Update package.json

Add `"type": "module"` and scripts:

```json
{
  "name": "randomuser-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx --watch src/server.ts",
    "start": "node dist/server.js",
    "inspect": "npx @modelcontextprotocol/inspector tsx src/server.ts"
  }
}
```

### Step 5: Create Project Structure

```bash
mkdir -p src/tools
touch src/server.ts src/types.ts
touch src/tools/get-random-user.ts src/tools/get-filtered-users.ts
touch .env.example .gitignore
```

Your structure should look like:

```
randomuser-mcp-server/
├── src/
│   ├── server.ts
│   ├── types.ts
│   └── tools/
│       ├── get-random-user.ts
│       └── get-filtered-users.ts
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## Creating the Server

### Understanding the McpServer Class

The `McpServer` class provides a high-level API for building MCP servers. Key methods:

- `registerTool()`: Register a tool that LLMs can call
- `registerResource()`: Register a resource for reading
- `registerPrompt()`: Register a prompt template
- `connect()`: Connect to a transport
- `close()`: Gracefully shutdown

### Step 1: Define Type Definitions

Create `src/types.ts` to define TypeScript interfaces for the randomuser.me API:

```typescript
export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  email: string;
  phone: string;
  cell: string;
  nat: string;
  // ... other fields
}

export interface RandomUserApiResponse {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface GetRandomUserParams {
  gender?: 'male' | 'female';
  nat?: string;
}

export interface GetFilteredUsersParams {
  results?: number;
  gender?: 'male' | 'female';
  nat?: string;
  inc?: string;
  exc?: string;
}
```

### Step 2: Create the Main Server File

Create `src/server.ts`:

```typescript
#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MCP_ENDPOINT = '/mcp';

// Create the MCP server instance
const mcpServer = new McpServer({
  name: 'randomuser-mcp-server',
  version: '1.0.0',
});

// Logging helper (logs to stderr per MCP best practices)
const log = (message: string) => {
  console.error(`[${new Date().toISOString()}] ${message}`);
};
```

**Important notes:**

- Use `console.error()` for logging (stderr), never `console.log()` (stdout)
- In stdio mode, stdout is reserved for JSON-RPC messages only
- The shebang `#!/usr/bin/env node` makes the file executable

## Implementing Tools

Tools are the primary way LLMs interact with your server. Each tool has:

- **Name**: Unique identifier
- **Description**: What the tool does
- **Input Schema**: Zod schema defining expected parameters
- **Callback**: Async function that executes the tool

### Step 1: Implement get_random_user Tool

Create `src/tools/get-random-user.ts`:

```typescript
import type { RandomUserApiResponse, GetRandomUserParams } from '../types.js';

export async function getRandomUser(params: GetRandomUserParams = {}): Promise<string> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.gender) {
      queryParams.append('gender', params.gender);
    }
    
    if (params.nat) {
      queryParams.append('nat', params.nat);
    }

    const url = `https://randomuser.me/api/?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data: RandomUserApiResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return 'No user data returned from API';
    }
    
    const user = data.results[0];
    
    // Format the user data
    return `
**Random User Information**

Name: ${user.name.title} ${user.name.first} ${user.name.last}
Gender: ${user.gender}
Email: ${user.email}
Phone: ${user.phone}
Location: ${user.location.city}, ${user.location.country}
Nationality: ${user.nat}
`.trim();
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
```

**Best practices:**

- Always handle errors gracefully
- Return user-friendly error messages
- Use TypeScript types for type safety
- Format output for readability

### Step 2: Register the Tool

In `src/server.ts`, import and register the tool:

```typescript
import { getRandomUser } from './tools/get-random-user.js';

// Register get_random_user tool
mcpServer.registerTool(
  'get_random_user',
  {
    description: 'Fetches a single random user from randomuser.me API with optional filters',
    inputSchema: {
      gender: z.enum(['male', 'female'])
        .optional()
        .describe('Filter by gender (optional)'),
      nat: z.string()
        .regex(/^[A-Z]{2}$/)
        .optional()
        .describe('Filter by nationality using 2-letter country code (e.g., US, GB, FR)'),
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
```

**Understanding the registration:**

1. **First parameter**: Tool name (used by clients to call it)
2. **Second parameter**: Configuration object with:
   - `description`: Human-readable description
   - `inputSchema`: Zod schema object (NOT a JSON Schema, but Zod shapes)
3. **Third parameter**: Callback function that:
   - Receives validated `args` based on the schema
   - Returns a `CallToolResult` with content array

### Step 3: Implement get_filtered_users Tool

Create `src/tools/get-filtered-users.ts`:

```typescript
import type { RandomUserApiResponse, GetFilteredUsersParams } from '../types.js';

export async function getFilteredUsers(params: GetFilteredUsersParams = {}): Promise<string> {
  try {
    const results = params.results || 10;
    
    if (results < 1 || results > 5000) {
      return 'Error: results parameter must be between 1 and 5000';
    }

    const queryParams = new URLSearchParams();
    queryParams.append('results', results.toString());
    
    if (params.gender) queryParams.append('gender', params.gender);
    if (params.nat) queryParams.append('nat', params.nat);
    if (params.inc) queryParams.append('inc', params.inc);
    if (params.exc) queryParams.append('exc', params.exc);

    const url = `https://randomuser.me/api/?${queryParams.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data: RandomUserApiResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return 'No users returned from API';
    }
    
    // Format the users list
    const filterInfo = [];
    if (params.gender) filterInfo.push(`Gender: ${params.gender}`);
    if (params.nat) filterInfo.push(`Nationality: ${params.nat}`);
    
    const header = `**Filtered Users (${data.results.length} results)**${
      filterInfo.length > 0 ? `\nFilters: ${filterInfo.join(', ')}` : ''
    }\n\n`;
    
    const usersList = data.results.map((user, index) => {
      return `${index + 1}. ${user.name.first} ${user.name.last} (${user.gender})
   Email: ${user.email}
   Location: ${user.location.city}, ${user.location.country}`;
    }).join('\n\n');
    
    return header + usersList;
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
```

Register it in `src/server.ts`:

```typescript
mcpServer.registerTool(
  'get_filtered_users',
  {
    description: 'Fetches a list of random users with various filters',
    inputSchema: {
      results: z.number().min(1).max(5000).optional()
        .describe('Number of users to fetch (1-5000). Default: 10'),
      gender: z.enum(['male', 'female']).optional()
        .describe('Filter by gender'),
      nat: z.string().optional()
        .describe('Comma-separated nationality codes (e.g., "US,GB,FR")'),
      inc: z.string().optional()
        .describe('Comma-separated fields to include'),
      exc: z.string().optional()
        .describe('Comma-separated fields to exclude'),
    },
  },
  async (args) => {
    log(`Executing get_filtered_users with args: ${JSON.stringify(args)}`);
    const result = await getFilteredUsers(args);
    return {
      content: [{ type: 'text', text: result }],
    };
  }
);
```

## Transport Layer: Streamable HTTP

The transport layer handles communication between client and server. Streamable HTTP is the recommended transport for remote servers.

### Understanding Streamable HTTP

Streamable HTTP combines the benefits of:

- **HTTP POST**: Simple request/response for quick operations
- **Server-Sent Events (SSE)**: Streaming for long-running operations
- **Session Management**: Optional stateful sessions with session IDs

**Key features:**

- Client POSTs JSON-RPC messages to the MCP endpoint
- Server can respond with either:
  - Direct JSON response (for quick operations)
  - SSE stream (for long-running operations or server notifications)
- Origin validation for security (prevents DNS rebinding attacks)

### Setting Up the Transport

Add Express server and transport configuration to `src/server.ts`:

```typescript
const app = express();

// Configure CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow no origin (curl, Postman)
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true); // Allow localhost
    }
    callback(null, true); // For demo; in production, use a whitelist
  },
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    server: 'randomuser-mcp-server', 
    version: '1.0.0' 
  });
});

// Create Streamable HTTP transport
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => crypto.randomUUID(),
});

// Connect MCP server to transport
await mcpServer.connect(transport);

// Handle MCP requests
app.all(MCP_ENDPOINT, async (req, res) => {
  await transport.handleRequest(req, res, req.body);
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  log(`Express error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
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
```

**Key points:**

- `sessionIdGenerator`: Generates unique session IDs (set to `undefined` for stateless mode)
- `transport.handleRequest()`: Handles incoming HTTP requests
- `app.all()`: Accepts both GET and POST to the MCP endpoint
- Health check endpoint is useful for monitoring

## Testing Your Server

### Step 1: Start the Development Server

```bash
npm run dev
```

You should see:

```
[2026-05-17T08:41:39.240Z] 🚀 Randomuser MCP Server running on http://localhost:3000
[2026-05-17T08:41:39.241Z] 📡 MCP endpoint: http://localhost:3000/mcp
[2026-05-17T08:41:39.241Z] 💡 Health check: http://localhost:3000/health
[2026-05-17T08:41:39.241Z]
Server is ready to accept MCP connections!
```

### Step 2: Test Health Check

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{"status":"ok","server":"randomuser-mcp-server","version":"1.0.0"}
```

### Step 3: Test MCP Protocol

Initialize a session:

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-11-25",
      "capabilities": {},
      "clientInfo": {
        "name": "test-client",
        "version": "1.0.0"
      }
    }
  }'
```

**Important**: The `Accept` header must include both `application/json` and `text/event-stream`.

Expected response (SSE format):

```
event: message
data: {"result":{"protocolVersion":"2025-11-25","capabilities":{"tools":{"listChanged":true}},"serverInfo":{"name":"randomuser-mcp-server","version":"1.0.0"}},"jsonrpc":"2.0","id":1}
```

### Step 4: Use MCP Inspector

The MCP Inspector is a visual tool for testing MCP servers:

```bash
npm run inspect
```

This opens an interactive UI where you can:

- See all available tools
- Test tool execution with custom parameters
- View request/response messages
- Inspect server capabilities

## Exposing Your Server via HTTPS with DevTunnel

While testing on localhost is convenient for development, you may need to expose your MCP server over HTTPS to:

- Test with remote clients
- Integrate with cloud-based services
- Share your server with team members
- Use with services that require HTTPS endpoints

**DevTunnel** is Microsoft's solution for creating secure HTTPS tunnels to your local server.

### What is DevTunnel?

DevTunnel creates a secure tunnel from a public HTTPS URL to your local development server. It's similar to ngrok but:

- ✅ Built and supported by Microsoft
- ✅ Free for development use
- ✅ Integrates well with Azure and Microsoft services
- ✅ Supports anonymous access (no authentication required for clients)
- ✅ Provides stable, resumable tunnels

### Installing DevTunnel

#### macOS

```bash
brew install --cask devtunnel
```

#### Windows

```bash
winget install Microsoft.devtunnel
```

#### Linux

Download from the [official release page](https://aka.ms/devtunnels/download).

### First-Time Setup

After installation, login to DevTunnel:

```bash
devtunnel user login
```

This will open a browser for Microsoft account authentication.

### Using DevTunnel with Your MCP Server

We've created convenient npm scripts to manage DevTunnel integration.

#### Option 1: Start Server and Tunnel Together (Recommended)

```bash
npm run dev:tunnel
```

This command:
1. Starts your MCP server on localhost:3000
2. Creates a DevTunnel tunnel
3. Hosts the tunnel with anonymous access enabled
4. Displays the HTTPS URL

You'll see output like:

```
🔧 Setting up devtunnel...
📡 Creating devtunnel...
Tunnel ID: abc-def-123
🚀 Hosting tunnel abc-def-123...

✅ DevTunnel is ready!
📡 Tunnel URL: https://abc-def-123.devtunnels.ms
🔌 MCP Endpoint: https://abc-def-123.devtunnels.ms/mcp
📝 Tunnel info saved to: .tunnel-info.json

Press Ctrl+C to stop the tunnel

[2026-05-17T08:41:39.240Z] 🚀 Randomuser MCP Server running on http://localhost:3000
[2026-05-17T08:41:39.241Z] 📡 MCP endpoint: http://localhost:3000/mcp
```

**Important**: The tunnel URL is automatically saved to `.tunnel-info.json` for use by other scripts.

#### Option 2: Manual Tunnel Management

Start the server and tunnel separately:

```bash
# Terminal 1: Start the MCP server
npm run dev

# Terminal 2: Create and host the tunnel
npm run tunnel:create
```

#### Cleaning Up Tunnels

When you're done, you can delete all tunnels:

```bash
npm run tunnel:delete
```

### Testing with DevTunnel URL

Once your tunnel is running, you can test it:

```bash
# Replace with your actual tunnel URL
TUNNEL_URL="https://your-tunnel-id.devtunnels.ms"

# Test health check
curl $TUNNEL_URL/health

# Test MCP initialization
curl -X POST $TUNNEL_URL/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-11-25",
      "capabilities": {},
      "clientInfo": {
        "name": "test-client",
        "version": "1.0.0"
      }
    }
  }'
```

### Using MCP Inspector with DevTunnel

To test your tunneled server with MCP Inspector:

```bash
npm run inspect:tunnel
```

This script:
1. Reads the tunnel URL from `.tunnel-info.json`
2. Launches MCP Inspector with the HTTPS endpoint
3. Allows you to test tools through the public URL

**Manual alternative**:

```bash
# If you have the tunnel URL
npx @modelcontextprotocol/inspector https://your-tunnel-id.devtunnels.ms/mcp
```

### DevTunnel Configuration Files

The tunnel setup creates a `.tunnel-info.json` file:

```json
{
  "tunnelId": "abc-def-123",
  "tunnelUrl": "https://abc-def-123.devtunnels.ms",
  "mcpEndpoint": "https://abc-def-123.devtunnels.ms/mcp",
  "port": 3000,
  "timestamp": "2026-05-17T08:41:39.240Z"
}
```

**This file is git-ignored** to prevent accidentally committing tunnel URLs.

### DevTunnel Best Practices

1. **Security**:
   - DevTunnels with `--allow-anonymous` are publicly accessible
   - Don't expose sensitive data without authentication
   - For production, use proper OAuth or API key authentication
   - Consider using `--access-control` for restricted access

2. **Stability**:
   - Tunnel URLs persist across restarts (same tunnel ID)
   - Use `devtunnel list` to see all your tunnels
   - Use `devtunnel delete <id>` to remove specific tunnels

3. **Development Workflow**:
   ```bash
   # Day-to-day development (local only)
   npm run dev
   
   # When you need to share or test remotely
   npm run dev:tunnel
   
   # When testing with remote inspector
   npm run inspect:tunnel
   ```

4. **Troubleshooting**:
   ```bash
   # List all your tunnels
   devtunnel list
   
   # Show tunnel details
   devtunnel show <tunnel-id>
   
   # Check if devtunnel is logged in
   devtunnel user show
   
   # Re-login if needed
   devtunnel user login
   ```

### Understanding the Tunnel Scripts

The DevTunnel integration uses two helper scripts:

#### `scripts/create-tunnel.js`

This script:
- Checks if devtunnel is installed
- Creates a new tunnel with anonymous access
- Hosts the tunnel on the configured port
- Saves tunnel information to `.tunnel-info.json`
- Displays the public HTTPS URL

#### `scripts/inspect-tunnel.js`

This script:
- Reads tunnel information from `.tunnel-info.json`
- Launches MCP Inspector with the public URL
- Handles errors if tunnel isn't running

### Advantages of DevTunnel for MCP Development

1. **HTTPS by Default**: Many MCP clients require HTTPS in production
2. **Easy Sharing**: Share your MCP server with teammates or for demos
3. **Cloud Integration**: Test integration with cloud-based AI services
4. **Realistic Testing**: Test your server in conditions closer to production
5. **Microsoft 365 Integration**: Works seamlessly with M365 Agents Toolkit

### Limitations

- **Performance**: Adds network latency compared to localhost
- **Availability**: Requires internet connection
- **Rate Limits**: Free tier has usage limits
- **Security**: Public URLs are accessible to anyone (unless restricted)

### Alternative: Production Deployment

For production, consider:

- **Azure App Service**: Deploy your MCP server to Azure
- **Azure Container Apps**: Containerized deployment
- **Custom Domain**: Use your own domain with SSL certificate
- **Authentication**: Implement OAuth 2.0 or API key authentication

DevTunnel is ideal for **development and testing**, not production deployments.

## Using with VS Code Microsoft 365 Agents Toolkit

The Microsoft 365 Agents Toolkit extension in VS Code can connect to your MCP server.

### Prerequisites

1. Install the **Microsoft 365 Agents Toolkit** extension in VS Code
2. Your MCP server must use **Streamable HTTP** transport (✅ we're using it!)

### Option 1: Connecting via Localhost

For local development and testing:

1. **Start your server**:
   ```bash
   npm run dev
   ```

2. **In VS Code**, open the Microsoft 365 Agents Toolkit panel

3. **Add MCP Server**:
   - Click "Add MCP Server"
   - Enter server URL: `http://localhost:3000/mcp`
   - Server name: `randomuser-mcp-server`

4. **Test the connection**:
   - The toolkit should discover your tools
   - You can now use these tools in your agent workflows

### Option 2: Connecting via DevTunnel (Recommended for Remote/Cloud)

For remote access or cloud-based testing:

1. **Start your server with DevTunnel**:
   ```bash
   npm run dev:tunnel
   ```

2. **Copy the MCP endpoint URL** from the console output:
   ```
   🔌 MCP Endpoint: https://abc-def-123.devtunnels.ms/mcp
   ```

3. **In VS Code**, open the Microsoft 365 Agents Toolkit panel

4. **Add MCP Server**:
   - Click "Add MCP Server"
   - Enter server URL: `https://your-tunnel-id.devtunnels.ms/mcp`
   - Server name: `randomuser-mcp-server`

5. **Benefits of using DevTunnel**:
   - ✅ Works from any network location
   - ✅ HTTPS connection (more realistic for production)
   - ✅ Can share with team members
   - ✅ Better for cloud-based AI services

### Example Usage in an Agent

Once connected, you can reference your tools in agent instructions:

```markdown
You can fetch random user data using the following tools:

- `get_random_user`: Get a single random user (optionally filtered by gender/nationality)
- `get_filtered_users`: Get multiple users with advanced filtering
```

## Troubleshooting

### Common Issues

#### 1. "Router.use() requires a middleware function"

**Problem**: Trying to use `transport.router` which doesn't exist.

**Solution**: Use `transport.handleRequest(req, res, req.body)` instead:

```typescript
app.all(MCP_ENDPOINT, async (req, res) => {
  await transport.handleRequest(req, res, req.body);
});
```

#### 2. "Not Acceptable: Client must accept both application/json and text/event-stream"

**Problem**: Missing required Accept headers.

**Solution**: Include both content types:

```bash
-H "Accept: application/json, text/event-stream"
```

#### 3. "setRequestHandler is not a function"

**Problem**: Using old SDK API.

**Solution**: Use `registerTool()` instead of `setRequestHandler()`:

```typescript
// ❌ Old API (doesn't exist in McpServer)
mcpServer.setRequestHandler(CallToolRequestSchema, ...)

// ✅ New API
mcpServer.registerTool(name, config, callback)
```

#### 4. Server not logging output

**Problem**: Using `console.log()` instead of `console.error()`.

**Solution**: Always log to stderr:

```typescript
// ❌ Wrong (stdout is for JSON-RPC in stdio mode)
console.log('Server started');

// ✅ Correct (stderr is for logs)
console.error('Server started');
```

### Debugging Tips

1. **Enable verbose logging**: Add detailed logs in your tool callbacks
2. **Use MCP Inspector**: Visual debugging is easier than curl
3. **Check network tab**: In browser DevTools if using a web client
4. **Validate JSON-RPC**: Use a JSON-RPC validator for message format
5. **Check CORS**: Ensure CORS is configured correctly for your client origin

### DevTunnel-Specific Issues

#### 1. "devtunnel command not found"

**Problem**: DevTunnel is not installed.

**Solution**: Install DevTunnel:
- macOS: `brew install --cask devtunnel`
- Windows: `winget install Microsoft.devtunnel`
- Linux: Download from https://aka.ms/devtunnels/download

Then login: `devtunnel user login`

#### 2. "No tunnel info found"

**Problem**: Trying to use `npm run inspect:tunnel` without running the tunnel first.

**Solution**: Start the tunnel:
```bash
npm run dev:tunnel
```

Or create tunnel separately:
```bash
npm run tunnel:create
```

#### 3. Tunnel URL not working

**Problem**: Tunnel might have expired or been deleted.

**Solution**: 
```bash
# List your tunnels
devtunnel list

# Delete old tunnels and create new one
npm run tunnel:delete
npm run dev:tunnel
```

#### 4. "Access denied" errors on DevTunnel

**Problem**: Not logged in or session expired.

**Solution**:
```bash
devtunnel user show
devtunnel user login
```
5. **Check CORS**: Ensure CORS is configured correctly for your client origin

## Next Steps

### Extend Your Server

1. **Add more tools**:
   - Implement additional randomuser.me endpoints
   - Add seeded requests for reproducibility
   - Create pagination support

2. **Add resources**:
   ```typescript
   mcpServer.registerResource(
     'user_schema',
     'user://schema',
     { description: 'User data schema' },
     async () => ({
       contents: [{ 
         uri: 'user://schema',
         mimeType: 'application/json',
         text: JSON.stringify(userSchema, null, 2)
       }]
     })
   );
   ```

3. **Add prompts**:
   ```typescript
   mcpServer.registerPrompt(
     'generate_user_report',
     { description: 'Generate a report for a user' },
     async () => ({
       messages: [{
         role: 'user',
         content: {
           type: 'text',
           text: 'Generate a detailed report for this user...'
         }
       }]
     })
   );
   ```

### Production Deployment

1. **Environment variables**: Use `.env` for sensitive config
2. **Security**:
   - Implement authentication (OAuth 2.0)
   - Validate Origin header strictly
   - Use HTTPS in production
   - Add rate limiting
3. **Monitoring**:
   - Add structured logging
   - Implement health checks
   - Monitor error rates
4. **Containerization**:
   ```dockerfile
   FROM node:22-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --production
   COPY dist ./dist
   CMD ["node", "dist/server.js"]
   ```

### Learning Resources

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP TypeScript SDK Docs](https://ts.sdk.modelcontextprotocol.io/)
- [MCP Examples Repository](https://github.com/modelcontextprotocol/servers)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

## Summary

You've built a complete MCP server that:

✅ Uses the official TypeScript SDK  
✅ Implements Streamable HTTP transport  
✅ Exposes two functional tools  
✅ Handles errors gracefully  
✅ Works with VS Code Microsoft 365 Agents Toolkit  
✅ Follows MCP best practices  

The same patterns can be applied to build servers for any API or service. MCP provides the standardized protocol, and you provide the tools that make your data and functionality accessible to LLMs.

Happy building! 🚀
