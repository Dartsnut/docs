---
title: MCP For Other Agents
description: Connect other MCP-capable agents to a Dartsnut machine.
permalink: /agent/mcp-for-other-agents/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# MCP For Other Agents

Agents that support MCP can connect directly to the Dartsnut firmware MCP
server. The Dartsnut Agent plugin includes this MCP server definition:

```json
{
  "mcpServers": {
    "dartsnut-firmware": {
      "type": "http",
      "url": "${DARTSNUT_MACHINE_URL}/mcp"
    }
  }
}
```

Set `DARTSNUT_MACHINE_URL` to the base URL of the Dartsnut machine you want the
agent to control:

```bash
export DARTSNUT_MACHINE_URL=http://192.168.1.42:9252
```

For agents that do not expand environment variables in MCP configuration, write
the full machine URL directly:

```json
{
  "mcpServers": {
    "dartsnut-firmware": {
      "type": "http",
      "url": "http://192.168.1.42:9252/mcp"
    }
  }
}
```

Restart the agent after changing MCP configuration so it reloads the server
list. Use the Dartsnut machine IP address for the machine you intend to control.

</article>
</div>
