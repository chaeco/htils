# Changelog

All notable changes to this project will be documented in this file.

## [0.0.5] - 2026-08-14

### Fixed

- **`createSnowflake` export missing** — the factory was only available via the `id` namespace (`id.createSnowflake`); it is now a first-class named export (`import { createSnowflake } from '@chaeco/htils'`), matching the documented usage in the README.
- **`promise.concurrency()` result ordering** — results are now collected by input index (like `Promise.all`) instead of completion order, so the returned array always matches the input promise order regardless of which promise resolves first.
- **package-lock version drift** — `package-lock.json` self-version was stale (1.0.0) and is now synced to the package version.

### Added

- **Project website** — `website/` landing page (unified Chaeco dark-terminal style) with live terminal demo, module overview table, and install CTA.
- **GitHub Pages workflow** — `.github/workflows/pages.yml` deploys `website/` to GitHub Pages.

## [0.0.4] - 2026-02-14

### Added
- Added robust `Snowflake` ID generator implementation (64-bit BigInt).
- Added `Snowflake` class and `createSnowflake` factory function for custom worker ID configurations.
- Improved `snowflake()` utility with standard algorithm support.

## [0.0.3] - 2026-02-12

### Added
- Added `MemoryStorage` as a fallback for `localStorage` in Node.js environments.
- Added environment detection for `ClipboardItem`, `FileReader`, and other browser-only APIs.

### Changed
- **Major Fix**: Enhanced Node.js compatibility for all modules.
- Refactored `storage`, `cookie`, `dom`, `device`, `clipboard`, and `fileHandler` to be safe for SSR/Isomorphic environments.
- Updated `device.isMiniProgram` to safely detect mini-program environments without crashing in Node.js.
- Improved `atob` fallback in `fileHandler` using Node.js `Buffer`.

### Fixed
- Fixed `ReferenceError: window is not defined` when importing the library in Node.js environments (e.g., in Express controllers or Next.js API routes).
- Fixed module-level side effects that were accessing browser globals on load.
- Resolved issue where `performance` API could not be accessed in Node.js modules.

## [0.0.2] - 2026-01-20

### Added
- Initial project structure.
- Implementation of core utilities: `array`, `object`, `string`, `date`, `number`, `validate`, `format`.
- Added `scformat` (Snake/Camel format conversion) for complex data structures.
- Added basic `storage` and `cookie` management.
- Added `eventBus` and `logger`.
- Added `crypto` utility (MD5, SHA256, etc.).

### Changed
- Improved TypeScript type definitions.
- Optimized performance for recursive object processing.

## [0.0.1] - 2026-01-10

### Added
- Project initialization.
- Basic build configuration (TypeScript, Vitest).
