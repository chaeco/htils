# Changelog

All notable changes to this project will be documented in this file.

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
