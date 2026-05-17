# Randomuser MCP Server

A minimal, production-ready MCP (Model Context Protocol) server demonstrating how to build MCP servers using TypeScript and the official `@modelcontextprotocol/sdk`. This server exposes tools to interact with the [randomuser.me](https://randomuser.me) API.

## Features

- ✅ **Streamable HTTP Transport** - Compatible with VS Code Microsoft 365 Agents Toolkit
- ✅ **DevTunnel Support** - Expose your server via HTTPS for remote access
- ✅ **Two Working Tools** - Fetch random users with various filters
- ✅ **TypeScript** - Full type safety with proper type definitions
- ✅ **Production-Ready** - Error handling, logging, CORS, health checks
- ✅ **Well-Documented** - Comprehensive tutorial included

## Quick Start

### Prerequisites

- Node.js 18+ (developed with Node.js 22)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment template (optional)
cp .env.example .env

# Start development server (localhost only)
npm run dev

# OR start with DevTunnel for HTTPS access
npm run dev:tunnel
```

The server will start on `http://localhost:3000` by default. With DevTunnel, you'll also get an HTTPS URL like `https://your-tunnel-id.devtunnels.ms`.

### Verify Installation

Test the health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{"status":"ok","server":"randomuser-mcp-server","version":"1.0.0"}
```

## Available Tools

### 1. get_random_user

Fetches a single random user from randomuser.me API.

**Parameters:**

- `gender` (optional): Filter by gender (`male` or `female`)
- `nat` (optional): Filter by nationality (2-letter country code, e.g., `US`, `GB`, `FR`)

**Example:**

```json
{
  "name": "get_random_user",
  "arguments": {
    "gender": "female",
    "nat": "US"
  }
}
```

### 2. get_filtered_users

Fetches a list of random users with advanced filtering.

**Parameters:**

- `results` (optional): Number of users to fetch (1-5000, default: 10)
- `gender` (optional): Filter by gender
- `nat` (optional): Comma-separated nationality codes (e.g., `"US,GB,FR"`)
- `inc` (optional): Comma-separated fields to include (e.g., `"gender,name,email"`)
- `exc` (optional): Comma-separated fields to exclude (e.g., `"login,registered"`)

**Example:**

```json
{
  "name": "get_filtered_users",
  "arguments": {
    "results": 5,
    "gender": "male",
    "nat": "GB,FR"
  }
}
```
Local Development (Localhost)

#### With MCP Inspector

The easiest way to test your server locally:

```bash
npm run inspect
```

This opens an interactive UI where you can test all tools visually.

#### With curl

Test the health endpoint:
#### Option 1: Localhost (Local Development)

1. Start the server: `npm run dev`
2. Open VS Code with Microsoft 365 Agents Toolkit extension
3. Add MCP Server:
   - URL: `http://localhost:3000/mcp`
   - Name: `randomuser-mcp-server`
4. Use the tools in your agent workflows

#### Option 2: DevTunnel (Remote/Cloud Access)

1. Start the server with tunnel: `npm run dev:tunnel`
2. Copy the MCP endpoint URL from console: `https://your-tunnel-id.devtunnels.ms/mcp`
3. Open VS Code with Microsoft 365 Agents Toolkit extension
4. Add MCP Server:
   - URL: `https://your-tunnel-id.devtunnels.ms/mcp`
   - Name: `randomuser-mcp-server`
5. Benefits:
   - ✅ HTTPS connection (production-ready)
   - ✅ Accessible from anywhere
   - ✅ Shareable with team members
   - ✅ Better for cloud AI service)

To expose your server over HTTPS for remote access or cloud integration:

```bash
# Start server and create HTTPS tunnel
npm run dev:tunnel
```

This will:
- Start your MCP server on localhost:3000
- Create a DevTunnel tunnel with HTTPS
- Display the public URL (e.g., `https://abc-def-123.devtunnels.ms`)
- Save tunnel info to `.tunnel-info.json`

**Use MCP Inspector with tunnel:**

```bash
npm run inspect:tunnel
```

### DevTunnel Prerequisites

First-time setup for DevTunnel:

```bash
# Install DevTunnel
# macOS:
brew install --cask devtunnel

# Windows:
winget install Microsoft.devtunnel

# Login (opens browser for authentication)
devtunnel user login
```
```

This opens an interactive UI where you can test all tools visually.

### With VS Code Microsoft 365 Agents Toolkit

1. Start the server: `npm run dev`
2. Open VS Code with Microsoft 365 Agents Toolkit extension
3. Add MCP Server:
   - URL: `http://localhost:3000/mcp`
   - Name: `randomuser-mcp-server`
4. Use the tools in your agent workflows

## Configuration

Create a `.env` file (optional):

```env
PORT=3000
LOG_LEVEL=info
```

##**DevTunnel setup and HTTPS tunneling**
-  Learn More

📖 **[Read the comprehensive tutorial](TUTORIAL.md)** to understand:

- How MCP works and its architecture
- Step-by-step server implementation
- Transport layer details (Streamable HTTP)
- Tool registration and schema validation
- Best practices and troubleshooting
- Production deployment guidance
- How to extend this server

## API Reference

This server uses:

- **MCP Protocol Version**: `2025-11-25`
- **Transport**: Streamable HTTP
- **SDK**: [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk) v1.29.0+
- **External API**: [randomuser.me](https://randomuser.me/documentation)

## Capabilities

The server exposes the following MCP capabilities:

```json
{
  "tools": {
    "listChanged": true
  }
}
```

## Troubleshooting

### Server won't start

```bash
# Check Node.js version (needs 18+)
node --version
 or `npm run dev:tunnel`)
- Check server logs for errors
- Verify client is connecting to correct endpoint
- Test with MCP Inspector first (`npm run inspect` or `npm run inspect:tunnel`)

### DevTunnel issues

```bash
# Check if devtunnel is installed
devtunnel --version

# Login if not authenticated
devtunnel user login

# List existing tunnels
devtunnel list

# Delete all tunnels and start fresh
npm run dev:tunnel
```
```
