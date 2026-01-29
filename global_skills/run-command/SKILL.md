---
name: run-command
description: Use this skill to execute shell commands safely and effectively.
---

# Run Command

This skill guides you in executing system commands.

## Workflow

1.  **Check Safety**:
    *   Is the command destructive (`rm`, `del`)? If so, `SafeToAutoRun` MUST be `false`.
    *   Is it a blocking command (`npm run dev`, `server start`)? If so, set `WaitMsBeforeAsync` appropriately to let it start, but don't wait forever.
2.  **Execute**:
    *   Use the `run_command` tool.
    *   Specify the correct `Cwd` (Current Working Directory). This is crucial.
3.  **Check Output**:
    *   If the command runs in background (returns an ID), use `command_status` or `read_terminal` to check if it started correctly.
    *   If it failed, read the error message and Fix it.

## Tips
*   Never run interactive commands (like `top` or `vi`) that require keyboard input effectively blocking the agent.
*   For long running processes, always check their status after a few seconds.
