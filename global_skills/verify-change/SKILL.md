---
name: verify-change
description: Use this skill to rigorously verify changes, ideally by creating a reproduction case before fixing a bug, or a test case before implementing a feature.
---

# Verify Change

This skill ensures that your changes actually work and don't introduce regressions.

## Workflow

1.  **Pre-computation / Application State Analysis**:
    *   Before changing code, determine how you will verify the fix.
    *   For bugs: Can you create a script (e.g., `repro_issue.js`) that demonstrates the bug?
    *   For features: Can you create a test script that fails now but should pass later?
2.  **Create Verification Artifact**:
    *   Use `write_to_file` to create a reproduction script or a small test.
    *   Run it using `run_command` to confirm the "Before" state (it should fail or show the bug).
3.  **Implement Changes**:
    *   Make your code changes using `replace_file_content`.
4.  **Post-Modification Verification**:
    *   Run the verification artifact again.
    *   Confirm it now passes or behaves as expected.
5.  **Clean Up**:
    *   Remove temporary test scripts unless the user wants to keep them as permanent tests.

## Tips
*   "It compiles" is not verification. "It runs and produces X" is verification.
*   Automated verification (scripts) is better than manual verification (asking user to click buttons), but sometimes manual is necessary (e.g., UI visual changes).
