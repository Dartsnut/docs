---
title: Codex/Claude Plugins
description: Install and update the Dartsnut Agent plugin in Codex and Claude Code.
permalink: /agent/codex-claude-plugins/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# Codex/Claude Plugins

The Dartsnut Agent plugin packages the Dartsnut skills used to build and
modify games and widgets. Install it when you want Codex or Claude Code to work
with Dartsnut projects outside the desktop emulator app.

The plugin includes the Dartsnut skill bundle and the MCP definition that lets
agents connect to a Dartsnut machine.

The plugin source lives in the Dartsnut emulator repository under
`plugins/dartsnut-agent`. The repository also includes marketplace files for
Codex and Claude Code.

## Install

Add the Dartsnut emulator repository as a Codex plugin marketplace, then install
the plugin from the `dartsnut` marketplace:

```bash
codex plugin marketplace add https://github.com/Dartsnut/dartsnut_emulator.git --ref main
codex plugin add dartsnut-agent@dartsnut
```

For local development from a checked-out repository, run the marketplace command
from the repository root:

```bash
codex plugin marketplace add .
codex plugin add dartsnut-agent@dartsnut
```

Start a new Codex thread after installing so the plugin skills are available in
the new session.

In Claude Code, add the Dartsnut emulator repository as a plugin marketplace,
then install the plugin from the `dartsnut` marketplace:

```text
/plugin marketplace add https://github.com/Dartsnut/dartsnut_emulator.git
/plugin install dartsnut-agent@dartsnut
```

For local development from a checked-out repository:

```text
/plugin marketplace add .
/plugin install dartsnut-agent@dartsnut
```

After installation, the skills are namespaced under the plugin name. For
example, use `dartsnut-agent:pydartsnut-core` when a Dartsnut project needs the
core runtime guidance.

## Machine URL

Before starting the agent, set `DARTSNUT_MACHINE_URL` to the base URL of the
Dartsnut machine you want the agent to control. Use the Dartsnut machine IP
address so the agent connects to the intended machine:

```bash
export DARTSNUT_MACHINE_URL=http://192.168.1.42:9252
```

Restart the agent session after changing environment variables so the MCP server
list is reloaded.

## Update

When the plugin marketplace was added from git, refresh the marketplace snapshot
and reinstall the plugin in Codex:

```bash
codex plugin marketplace upgrade dartsnut
codex plugin add dartsnut-agent@dartsnut
```

If you added the marketplace from a local checkout, pull or regenerate the local
repository first, then reinstall:

```bash
git pull
pnpm run export:agent-plugin
pnpm run check:agent-plugin
codex plugin add dartsnut-agent@dartsnut
```

Start a new Codex thread after reinstalling. Existing threads do not reload
new plugin skills or MCP tools.

For Claude Code, publish or pull the latest repository commit, then update the
plugin from the Claude Code plugin menu or reinstall it from the marketplace:

```text
/plugin install dartsnut-agent@dartsnut
```

The Claude plugin manifest intentionally omits a fixed version. For git-backed
marketplaces, Claude Code treats the git commit as the plugin version, so each
new commit can be installed as an update.

</article>
</div>
