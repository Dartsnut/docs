---
title: Skills For Other Agents
description: Install Dartsnut Agent skills with the open skills CLI.
permalink: /agent/skills-for-other-agents/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# Skills For Other Agents

The Dartsnut emulator repository includes agent skills under
`plugins/dartsnut-agent/skills`. Agents that support the open `skills` CLI can
install those skills directly from the repository with `npx skills`.

List the available Dartsnut skills before installing:

```bash
npx skills add Dartsnut/dartsnut_emulator --list --full-depth
```

Install all available Dartsnut skills for every supported agent detected by the
CLI:

```bash
npx skills add Dartsnut/dartsnut_emulator --all --full-depth
```

Install all available Dartsnut skills for one agent:

```bash
npx skills add Dartsnut/dartsnut_emulator --agent <agent> --skill '*' --full-depth -y
```

Install one skill for one agent:

```bash
npx skills add Dartsnut/dartsnut_emulator --agent <agent> --skill pydartsnut-game-io --full-depth -y
```

Use `-g` for a global user-level install instead of a project-level install:

```bash
npx skills add Dartsnut/dartsnut_emulator -g --agent <agent> --skill '*' --full-depth -y
```

The `--full-depth` flag is required because the Dartsnut skills live below
`plugins/dartsnut-agent/skills` inside the repository.

The `skills` CLI currently lists these Dartsnut skills:

| Skill | Use |
|-------|-----|
| `asset-pipeline` | Asset manifest, loader helper, placeholders, and apply-mode workflow for art-bearing game or widget entities. |
| `conf-contract` | Root `conf.json` schema, defaults, size rules, preview handling, and reload requirements. |
| `creator-incremental` | Workspace scaffold rules, just-in-time skill loading, file constraints, and emulator verification workflow. |
| `dartsnut-display-mapping` | Display and framebuffer mapping for panels, physical screens, layout, clipping, and fonts. |
| `dartsnut-skill` | Legacy runtime index that routes to the more specific Dartsnut skills. |
| `design-console-smallform` | Pixel-perfect compact UI guidance for console-style games and widgets. |
| `game-dart-colors` | Dart slot color mapping based on `dart_index` modulo four. |
| `karpathy-guidelines` | Coding behavior guidance for simpler, surgical, verifiable changes. |
| `pydartsnut-game-io` | Pygame loop, dart hit, button, and framebuffer update guidance for games. |
| `pydartsnut-widget-loop` | Pillow rendering, `widget_params`, and update loop guidance for widgets. |
| `widget-fonts` | Widget font catalog usage, font copy conventions, and safe font loading rules. |

Run `npx skills update` later to update installed skills. Use
`npx skills list --agent <agent>` to check what is installed for a specific
agent.

</article>
</div>
