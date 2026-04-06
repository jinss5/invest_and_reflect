Stage all changes and create a git commit following this project's commit message convention.

## Commit prefix rules

| Prefix      | When to use                         |
| ----------- | ----------------------------------- |
| `feat:`     | new feature                         |
| `fix:`      | bug fix                             |
| `refactor:` | code change with no behavior change |
| `chore:`    | maintenance / tooling               |

## Steps

1. Run `git status` and `git diff` to understand what changed.
2. Run `npm run lint` — if it fails, stop and fix the errors before continuing.
3. Choose the correct prefix based on the nature of the changes.
4. Stage relevant files with `git add`.
5. Write a concise commit message starting with the chosen prefix.
6. Commit with co-author trailer:
   ```
   Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
   ```

If the user provides a message via `$ARGUMENTS`, use it as the commit body (after the prefix line).
