---
title: Emulator Control
description: Emulator control notes for Dartsnut emulator and agent workflows.
permalink: /emulator-agent/emulator-control/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# Emulator Control

Use the Emulator panel to preview the active workspace before deploying it to a
machine. It shows the device screen, project status, logs, screenshots, and
game or widget controls.

## Basic Flow

1. Create or open a workspace.
2. Ask the agent to build or update the game or widget.
3. In the Emulator panel, click **Start / Reload**.
4. Watch the screen preview and status line.
5. If the project does not behave as expected, open **Logs**, fix the issue with
   the agent, then click **Start / Reload** again.
6. Capture a screenshot when you need a preview image or a record of the
   current result.

## Toolbar Controls

| Control | What it does |
| --- | --- |
| Start / Reload | Runs the active workspace in the emulator, or reloads it after changes. |
| Capture screenshot | Saves an image of the current emulator view. |
| Zoom 2x | Opens a larger emulator preview. |
| Logs | Opens the Python log drawer for the running project. |

## For Widgets

When the active workspace is a widget, the Emulator panel shows a widget
parameter editor. Use it to test different field values without changing the
project code.

1. Edit the parameter JSON.
2. Click **Format** if you want the JSON cleaned up.
3. Click **Apply + Reload** to rerun the widget with the new values.
4. Check the emulator screen and logs.

Use this flow before submitting a widget so you know it works with realistic
settings.

## For Games

When the active workspace is a game, the Emulator panel shows dart indicators.
Use them with the preview to simulate game input.

1. Select a dart number with the numbered dots or function keys.
2. Click the board preview to throw that dart.
3. Use keyboard controls for button input when the game expects it:
   `W`, `A`, `S`, `D` for direction, `K` for A, and `L` for B.
4. Right-click a placed dart to remove it. Double right-click the board to clear
   darts.

## When To Use The Emulator

Use the emulator before deploying or submitting whenever:

1. The agent created new project files.
2. You changed display layout, assets, animation, scoring, or widget fields.
3. You need screenshots for review.
4. You want to confirm there are no obvious errors in the logs.

</article>
</div>
