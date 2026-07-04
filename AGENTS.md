# AGENTS.md

## Project Overview

This repository is a pure static website for studying LeetCode Hot 100 problems in Chinese. It is deployed with GitHub Pages at:

```text
https://lichen23448.github.io/leetcode-hot100-cards/
```

There is no package manager, build step, backend, database, or framework. The site can be opened directly from `index.html` or served with a simple static file server.

## Important Files

- `index.html`: page structure and static DOM anchors used by `app.js`.
- `styles.css`: all visual styling and mobile responsive behavior.
- `app.js`: rendering, search, filters, progress, notes, copy button, and auto diagrams.
- `cards.js`: the full Hot 100 problem catalog, explanations, examples, and Java code.
- `diagrams/`: hand-made SVG diagrams for selected problems.
- `.github/workflows/static.yml`: GitHub Pages deployment workflow generated from GitHub's Static HTML template.
- `.nojekyll`: keeps GitHub Pages from running Jekyll processing.

Ignored local review artifacts:

- `audit-assets/`
- `card-audit-report.md`
- `style-audit.html`
- `.DS_Store`

Do not commit those unless the user explicitly asks.

## Local Run And Validation

Open directly:

```text
index.html
```

Or serve locally:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173
```

Before committing JavaScript/data edits, run:

```bash
node --check app.js
node --check cards.js
```

When changing deployment files, also verify the GitHub Pages URL after pushing.

## Git And Deployment

Remote:

```text
git@github.com:lichen23448/leetcode-hot100-cards.git
```

Main branch:

```text
main
```

Deployment is handled by `.github/workflows/static.yml`. Avoid adding a second Pages workflow unless there is a clear reason. The repository previously had a duplicate Pages workflow that caused noisy failures, so keep only the official Static HTML workflow unless the user requests a different deployment strategy.

## Problem Card Maintenance Rules

The user is studying one problem at a time and cares about understandability more than cleverness. When editing `cards.js`, follow these rules:

- Prefer the easiest-to-understand correct solution, not the most compressed or trick-heavy one.
- The `thought` field should be one concise sentence and must mention the key data structure or invariant when that is the core of the problem.
- Java answers should include helpful comments on key steps, but avoid noisy header comments or repeated boilerplate.
- `description` must include constraints that the code depends on, such as lowercase letters, uniqueness, reachable guarantees, non-empty matrix, reusable words, and answer existence.
- `explanation` should name why the method works and the most common trap when useful.
- `complexity` should match the actual Java implementation. For example, Java `substring` can affect complexity.
- If a problem is easy to misunderstand visually, add or improve a useful diagram. Do not add decorative diagrams that do not explain the algorithm.

The problem ids are derived from array order in `cards.js`:

```js
window.problemCatalog = rawProblems.map((problem, index) => ({
  id: index + 1,
  hasCard: true,
  ...problem
}));
```

Do not add manual `id` fields to individual cards.

## Group And Diagram Rules

Groups are shown in the sidebar and ordered by `groupOrder` in `app.js`. If you add or rename a `group` in `cards.js`, update:

- `groupOrder`
- `buildAutoDiagram(problem)` if the group needs a specific diagram template

Current important groups include:

- `哈希`
- `前缀和`
- `双指针`
- `滑动窗口`
- `单调队列`
- `子串`
- `普通数组`
- `矩阵`
- `链表`
- `二叉树`
- `图论`
- `回溯`
- `二分查找`
- `栈`
- `堆`
- `贪心算法`
- `动态规划`
- `多维动态规划`
- `中心扩展`
- `技巧`

## UX Preferences

- The site should remain usable on mobile.
- Clicking a problem in the list should scroll to the card.
- Mastered status should be obvious in the problem list.
- The progress ring should show mastered count out of 100.
- Do not make the first screen a marketing landing page. This is a study tool, so the card/list experience is the product.
- Keep code blocks readable and syntax-highlighted by the existing highlighter.

## Content Tone

Use clear Chinese explanations. The user prefers concise, direct phrasing:

- Start with the core idea.
- Explain the moving parts in plain language.
- Point out the trap that would make the solution fail.
- Use Java code that is easy to reproduce in an interview.

