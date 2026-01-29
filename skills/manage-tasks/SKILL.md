---
name: manage-tasks
description: Use this skill to manage your task list in task.md effectively.
---

# Manage Tasks

This skill is about keeping your work organized.

## Workflow

1.  **Initialize**:
    *   At the start of a major feature, create or reset the `task.md` artifact.
    *   Break down the user's request into granular steps.
2.  **Update Progress**:
    *   As you complete steps (using `task_boundary` or actual verification), update `task.md`.
    *   Mark items as `[x]` when verified.
    *   Mark items as `[/]` when starting.
3.  **Adapt**:
    *   If you discover new work is needed, add new items to `task.md`.
    *   If a task is no longer relevant, remove it or mark it as skipped.

## Tips
*   `task.md` is your shared memory with the user. Keep it accurate.
*   Don't make tasks too big ("Build App") or too small ("Type letter 'A'").
