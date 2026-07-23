# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.0.15] - 2026-06-23

### Changed
- Fix release Docker build on Alpine by @Hans-christian in 818baba
## [v1.0.14] - 2026-06-23

### Changed
- Migrate ESLint to flat config by @Hans-christian in 6f0588d
- build(deps): bump undici from 6.25.0 to 6.27.0 by @dependabot[bot] in a53ee6a
- Document Prism component bundler workaround by @Hans-christian in 8dd4cd5
- Remove unrelated footer changes by @Hans-christian in bd12002
- build(deps-dev): bump @vue/eslint-config-typescript by @dependabot[bot] in c108bca
- build(deps-dev): bump @typescript-eslint/eslint-plugin by @dependabot[bot] in fbe2a21
- build(deps): bump semver from 7.8.1 to 7.8.5 by @dependabot[bot] in a21088f
- build(deps-dev): bump typescript from 4.9.5 to 6.0.3 by @dependabot[bot] in 23a247a
- build(deps): bump actions/checkout from 6 to 7 by @dependabot[bot] in f3f1bcb
- reuse prism package languages by @Hans-christian in 1b42344
- chore: limit dependabot version updates by @Hans-christian in 15e1b4c
- Revert Prism workaround and pin Vite 8.0.14 by @Hans-christian in eb2e379
- docs: add release notes after v1.0.6 by @Hans-christian in 878b0c1
- Fix Prism startup crashes by @Hans-christian in 9340e16
- build(deps-dev): bump js-yaml from 4.1.1 to 4.2.0 by @dependabot[bot] in 62655b7

### Fixed
- fix: bump undici via override by @Hans-christian in 8b41620
- fix: use compatible vue eslint config typescript version by @Hans-christian in 13a9241
- fix: align typescript-eslint parser with plugin by @Hans-christian in f458f46
- fix Prisma reference error by @Hans-christian in f2092db
- fix prism startup crash by @Hans-christian in a7ebaaa
- fix: load prism languages at runtime by @Hans-christian in 5791cc4



### Release notes since `v1.0.6`

| Area | Package updates | Impact |
| --- | --- | --- |
| UI components | `bootstrap-vue-next` `0.42.0 -> 0.45.5` | Bootstrap component compatibility and rendering stability. |
| Vue runtime | `vue` `3.5.34 -> 3.5.35`, `vue-router` `4.6.4 -> 5.0.6`, `@fortawesome/vue-fontawesome` `3.1.3 -> 3.2.0` | Framework and router patch updates, plus icon component compatibility. |
| Icons | `@fortawesome/free-regular-svg-icons`, `@fortawesome/free-solid-svg-icons` | Updated icon set used by the UI. |
| RDF and data handling | `rdflib` `2.3.8 -> 2.3.9`, `vis-data` `6.4.1 -> 8.0.4` | RDF parsing and graph/data handling updates. |
| Tooling | `vite` `8.0.14 -> 8.0.16`, `core-js` `3.47.0 -> 3.49.0`, `semver` `7.8.0 -> 7.8.1`, `tmp` `0.2.5 -> 0.2.7`, `form-data` `4.0.5 -> 4.0.6` | Build/runtime and indirect dependency stability and security updates. |

### Release process fixes since `v1.0.6`

- `fix: make release tag selection stable` prevented the release workflow from picking the wrong tag.
- `fix: skip existing release versions` prevented duplicate release creation for already published versions.
- The Prism white-screen/startup crash is avoided by registering the Turtle and SPARQL grammars locally in the app, which keeps the patched Vite build workable.

## [v1.0.6] - 2026-05-05

### Changed
- No user-facing changes captured in commit messages.



## [v1.0.4] - 2026-04-21

### Changed
- Address review style feedback by @Hans-christian in 3a5e40b
- Use browser-neutral developer tools wording by @Hans-christian in ca5edf2
- Drop unrelated parser and view changes by @Hans-christian in 5019219
- Document external backend via environment variables by @Hans-christian in 0c2260e
- Fix bootstrap loading and HTTPS proxy handling by @Hans-christian in 1ab217e
- Bump follow-redirects from 1.15.11 to 1.16.0 by @dependabot[bot] in 78a5aac
- Bump axios from 1.13.5 to 1.15.0 by @dependabot[bot] in 3eb2212
- Bump vite from 7.3.1 to 7.3.2 by @dependabot[bot] in c811cf1
- Bump lodash from 4.17.23 to 4.18.1 by @dependabot[bot] in 8b47892
- Bump flatted and vuex-persist by @dependabot[bot] in 42d1118
- Bump undici from 6.23.0 to 6.24.1 by @dependabot[bot] in bf7287b
- Bump @xmldom/xmldom from 0.8.11 to 0.8.12 by @dependabot[bot] in a4a7171
- Bump picomatch by @dependabot[bot] in 8ed0894
- cleanup styles by @Hans-christian in c383b57
- Update src/views/SearchResults/style.scss by @Hans-Christian in f58065b
- Remove duplicate conformsTo and order alphabetical by @Hans-christian in fb61d55
- More robust by @Hans-christian in cefc274
- Fix monospace font by @Hans-christian in b5a0cbf
- icon on one line with Owner by @Hans-christian in 2180b73
- docs: update CHANGELOG.md for v1.0.3 by @github-actions[bot] in e6bd152

### Fixed
- Fix(slash) fix extra slash at the end by @Hans-christian in ca4e94a

### Removed
- remove !important by @Hans-christian in 9044fcc
- Order alphatically and remove duplicate conformsTO by @Hans-christian in 7230e01



## [v1.0.3] - 2026-03-11

### Changed
- Bump serialize-javascript and terser-webpack-plugin by @dependabot[bot] in 6c88746
- Bump immutable from 5.1.4 to 5.1.5 by @dependabot[bot] in 2c8aa06
- Bump minimatch from 3.1.2 to 3.1.5 by @dependabot[bot] in 96a8d15
- Bump rollup from 4.55.2 to 4.59.0 by @dependabot[bot] in 3c1b5f4
- Bump axios from 1.13.2 to 1.13.5 by @dependabot[bot] in 97790f7
- doc: update CHANGELOG.md for v1.0.0 by @LNDS-Sysadmins in 8b7bef9

### Fixed
- fix ping save by @Hans-christian in 9411e54
- fix index.html by @Hans-christian in fb97994
- Cherry pick fix of host by @Hans-christian in 241aa72



## [1.17.0]

### Added

- Add support for integer and decimal datetypes
## [v1.0.0] - 2026-02-13

### Fixed
- I did a patch of the index.html by @Hans-christian in e894c10


- Add boolean editor
- Add option to show the validation report when request fails
- Add datatypes in serialized RDF

### Changed

- Redesign entity detail page
- Redesign RDF metadata for machines download links
- Update reset to defaults text

## [1.16.3]

- Fix EnumSelectEditor

## [1.16.2]

- Fix custom logo on public path

## [1.16.1]

- Fix failed login handling
- Fix app title in the footer

## [1.16.0]

### Added

- Add app title and ping endpoints from config to the settings
- Add support for sh:order
- Add support for sh:description
- Add support for sh:minLength and sh:maxLength
- Add support for sh:in
- Add support for sh:group
- Add support for dash:DateTimePickerEditor
- Add support for dash:EnumSelectEditor
- Add groups and order to entity metadata
- Add form preview to resource definition and metadata schema
- Add autocomplete widget
- Add settings for autocomplete
- Add extra class statement for fields with class

### Changed

- Rename search param from q to query
- Remove hardcoded metadata timestamps

### Fixes

- Fix search filters with too many values
- Fix nested NodeShapes in form previews
- Fix value validation for multiple values

## [1.15.0]

### Added

- Extended search functionality
- Add saved search queries

## [1.14.0]

### Changed

- Rework metadata schemas

## [1.13.0]

### Added

- Add form preview to shape edit

## [1.12.0]

### Added

- FDP settings
- SHACL default values

### Fixed

- Multiple children with the same child relation
- Multiple conformsTo

## [1.11.0]

### Added

- Metadata profiles
- Shapes in resource definitions
- Metadata lables resolving

### Fixed

- Metadata with empty keywords
- Pagination in index

## [1.10.0]

### Added

- Reset to defaults
- Metadata children separated by type
- Default shapes changing allowed


## [1.9.0]

### Added

- Importing shapes from other FDPs
- Pagination for child resources

## [1.8.0]

### Added

- Admin UI to FDP Index

### Changed

- Proxy forwards client IP address in headers to FDP

## [1.7.0]

### Added

- FDP Index (from [FAIRDataPoint-index](https://github.com/FAIRDataTeam/FAIRDataPoint-index))
- Metadata search including RDF types

### Changed

- Updated dependencies

### Fixed

- Fix breadcrumbs
- Fix repository edit

## [1.6.0]

### Added

- API keys
- Metadata drafts

## [1.5.0]

### Added

- Editable resource definitions
- Date formatting for date metadata

### Changed

- Updated logo

### Fixed

- Fix resource definition save on nested url
- Fix save loading button in EntityCreate

## [1.4.0]

### Added

- Suggested prefixes for namespaces
- Re-enabled shapes creation
- "view all" for metadata lists

### Fixed

- Fix nested entities in SHACL form
- Fix RDF preview in SHACL form for nested entities

## [1.3.0]

### Added

- DASH and dynamic shapes configuration
- Shapes administration
- DASH list metadata
- Persistent URL from bootstrap config

### Changed

- Updated dashboard links

### Fixed

- Fix empty entity metadata
- Fix recursive `FormRenderer` in build

## [1.2.1]

### Fixed

- Fix local run on non-default port

## [1.2.0]

### Added

- Support custom metamodel (metadata layers)
- Allow to delete entity by admin
- Form field names
- Use data-cy for SHACL form Save button
- Add API builder and remove specific API for entities
- Metadata create forms
- Human-readable error messages
- Special handling of 404 error
- RDF preview

### Changed

- Switch to GitHub Actions (from Travis CI)
- Move about to footer
- Field blacklist
- Updated form models

### Fixed

- Fix API URL envvar
- Fix entity edit status flash
- Fix entity view if not authenticated
- Fix about icon
- Fix download RDF links

### Removed

- Sending `accessRights` for the distribution

## [1.1.0]

### Added

- Version information

### Changed

- Switched to TypeScript
- Updated dependencies
- Adjustments for [E2E tests](https://github.com/FAIRDataTeam/FAIRDataPoint-E2E-Tests)

## [1.0.0]

Initial version of client application for [FAIR Data Point] providing user interface for browsing and managing the metadata.

### Added

- Browsing and managing the metadata
- Navigation and breadcrumbs
- User login and management, permissions
- Set up CI, building and publishing Docker image
- Nginx as proxy for simple deployment with [FAIR Data Point]
- Support nested route deployment


[FAIR Data Point]: https://github.com/FAIRDataTeam/FAIRDataPoint

[Unreleased]: /../../compare/master...develop
[1.0.0]: /../../tree/v1.0.0
[1.1.0]: /../../tree/v1.1.0
[1.2.0]: /../../tree/v1.2.0
[1.2.1]: /../../tree/v1.2.1
[1.3.0]: /../../tree/v1.3.0
[1.4.0]: /../../tree/v1.4.0
[1.5.0]: /../../tree/v1.5.0
[1.6.0]: /../../tree/v1.6.0
[1.7.0]: /../../tree/v1.7.0
[1.8.0]: /../../tree/v1.8.0
[1.9.0]: /../../tree/v1.9.0
[1.10.0]: /../../tree/v1.10.0
[1.11.0]: /../../tree/v1.11.0
[1.12.0]: /../../tree/v1.12.0
[1.13.0]: /../../tree/v1.13.0
[1.14.0]: /../../tree/v1.14.0
[1.15.0]: /../../tree/v1.15.0
[1.16.0]: /../../tree/v1.16.0
[1.16.1]: /../../tree/v1.16.1
[1.16.2]: /../../tree/v1.16.2
[1.16.3]: /../../tree/v1.16.3
[1.17.0]: /../../tree/v1.17.0
