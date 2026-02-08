# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.3] - 2026-02-09

### Fixed

- Update CHANGELOG.md to include missing changes from v0.0.2

## [0.0.2] - 2026-02-09

### Changed

- chore: bump version to 0.0.2
- modify publisher
- refactor: rename extension from openrouterUsage to openrouterSimpleUsage

## [0.0.1] - 2026-02-08

### Added

- Initial release of OpenRouter Simple Usage extension
- 💵 Real-time balance display in VS Code status bar
- 🚨 Low balance alert (warning emoji when credits ≤ $10)
- 🔄 Auto-refresh with configurable interval (default: 10 minutes)
- ⚡ Manual refresh via command palette and status bar click
- 🔧 Configuration support for API key via settings
- 🔐 Environment variable support (`OPENROUTER_SIMPLE_USAGE_API_KEY`)
- 📊 Tooltip with detailed usage information (total, used, remaining)
