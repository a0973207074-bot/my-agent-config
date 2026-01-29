---
name: consult-architect
description: Use this skill when the user asks for high-level architectural advice or when you are about to start a complex feature and need to plan.
---

# Consult Architect

This skill helps you think like a software architect. Use it to analyze requirements, explore the codebase, and propose a robust technical plan before writing code.

## Workflow

1.  **Understand the Goal**: Read the user's request carefully. If requirements are vague, ask clarifying questions using `notify_user`.
2.  **Explore Context**:
    *   Use `list_dir` to understand the project structure to see where new code should live.
    *   Use `search_web` if you need to research external libraries or patterns.
    *   Use `grep_search` or `view_file_outline` to find relevant existing code.
3.  **Draft a Plan**:
    *   Create or update `implementation_plan.md` using `write_to_file`.
    *   Outline the changes: which files to modify, which to create, and how they interact.
    *   Assess risks: What could break? Are there security implications?
4.  **Review**:
    *   Present the plan to the user using `notify_user` with `PathsToReview` focusing on the plan.
    *   Ask for approval before proceeding to implementation.

## Tips
*   Always prioritize maintainability and scalability.
*   Don't just write code; explain *why* this approach is best.
