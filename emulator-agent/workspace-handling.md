---
title: Workspace Handling
description: Workspace handling notes for Dartsnut emulator and agent workflows.
permalink: /emulator-agent/workspace-handling/
---

<div class="doc">
  <article class="doc-content" markdown="1">

# Workspace Handling

Dartsnut Agent works on one project folder at a time. The project folder is the
workspace. It contains the files for the game or widget, including its
`conf.json`, `main.py`, and assets.

The workspace controls are in the top bar near the color/theme button:

| Control | Use it for |
| --- | --- |
| Start new project | Begin a fresh game or widget in the default temporary workspace. |
| Save project to a folder | Save the current temporary project into a permanent folder. |
| Open an existing project | Switch to a project folder that already exists on disk. |

## Default Temporary Workspace

When you start a new project, Dartsnut Agent creates a temporary workspace for
you. You can chat with the agent, build a game or widget, run it in the
emulator, and iterate without choosing a folder first.

Use the default temporary workspace when:

1. You are trying an idea and are not sure whether you want to keep it.
2. You want the agent to create a new game or widget from scratch.
3. You are quickly testing a concept before naming or organizing it.

Temporary workspaces are not meant to be your long-term project location. If
the temporary workspace is empty, the app can discard it automatically. If it
contains work and you start another project, open another workspace, or quit,
the app asks whether you want to save, discard, or cancel.

## Save As

Use **Save project to a folder** when the current temporary project is worth
keeping. The button is shown only while you are working in a temporary
workspace.

1. Click **Save project to a folder**.
2. Choose an empty folder.
3. Dartsnut Agent copies the temporary project into that folder and switches to
   it.
4. Continue working from the saved folder.

Use Save As when:

1. The game or widget is ready for more serious editing.
2. You want to deploy it to a machine.
3. You want to submit it for review.
4. You want to keep the files under a project directory you can find later.

The destination folder must be empty. If you choose a folder that already has
files in it, pick another folder or create a new one.

## Open Existing

Use **Open an existing project** when you already have a game or widget folder
on disk.

1. Click **Open an existing project**.
2. Choose the project folder.
3. Dartsnut Agent switches the chat, emulator, assets, deploy, and community
   panels to that workspace.
4. If the folder contains a valid `conf.json`, the app can identify whether it
   is a game or widget.

Use Open Existing when:

1. You are returning to a saved project.
2. You want to edit a project created outside the current app session.
3. You want to deploy or submit a specific saved project.
4. You need to switch away from the current workspace.

If you are leaving an unsaved temporary workspace that contains files, the app
asks whether you want to save it first.

</article>
</div>
