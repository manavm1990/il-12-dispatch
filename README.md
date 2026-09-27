# IL-12 Dispatch

## Agent skills

Project agent skills live in `.agents/skills/` and are pinned by `skills-lock.json`.
The `skills` CLI is a **global** tool only — not a project dependency or npm script. Install it on your machine and run it from the repo root.

### Install the CLI (once per machine)

```bash
npm install -g skills
# or: bun add -g skills
```

Requires `skills` **≥ 1.5.22** (older versions can fail “check for deleted skills” even when skill content still updates).

### Update skills

From the repo root:

```bash
skills update -y -p && rm -rf .claude
```

That runs the global CLI against **Project** scope, refreshes locked skills under `.agents/skills/`, updates `skills-lock.json`, and removes `.claude/` if the CLI recreates it.

Canonical skills live only in `.agents/skills/`. The CLI’s default/Universal update path also materializes `.claude/skills/` (usually symlinks) for Claude Code. This repo does not use that tree — `.claude/` is gitignored, and the command above deletes it after refresh.

If you install a skill manually, target Universal only so nothing is written under `.claude/`:

```bash
skills add <source> --skill <name> -a universal -y -p
```

Do not add or remove skills unless the team agrees — keep the set limited to what `skills-lock.json` already tracks.
