# Resume Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder resume page with a real bilingual game-development internship resume page using the approved content and layout.

**Architecture:** Keep the existing data-driven content model in `src/data/siteContent.ts`, but expand `resumeContent` into a structured resume schema. Refactor `src/components/ResumePage.astro` to render a resume-specific hero plus a left/right column layout that stays consistent with the current site style.

**Tech Stack:** Astro, TypeScript content data, existing i18n helpers, existing site CSS patterns, `npm run build` verification.

---

### Task 1: Finalize Resume Data Structure

**Files:**
- Modify: `src/data/siteContent.ts`

- [ ] Replace the placeholder `resumeContent` card data with a structured bilingual resume object.
- [ ] Add fields for title, description, identity, summary, skills, education, society, and projects.
- [ ] Fill in both `zh` and `en` text for all resume content using the approved Chinese copy and professional English equivalents.

### Task 2: Refactor Resume Page Rendering

**Files:**
- Modify: `src/components/ResumePage.astro`

- [ ] Replace the simple resume card grid with a dedicated resume layout.
- [ ] Add the hero block with page title, description, candidate name, and job direction.
- [ ] Add the left column for skills, education, and society experience.
- [ ] Add the right column for summary and projects with bullet lists.
- [ ] Keep `LocalizedText` for bilingual rendering and make the mobile layout collapse cleanly to one column.

### Task 3: Verify Build And Output

**Files:**
- Verify only: `src/data/siteContent.ts`, `src/components/ResumePage.astro`

- [ ] Run `npm run build`.
- [ ] Confirm the build succeeds with the new resume content and component structure.
- [ ] Review the generated page behavior for the bilingual routes through the build output expectations.
