# Changelog

## [3.0.3](https://github.com/aliakbarazizi/headless-datepicker/compare/v3.0.2...v3.0.3) (2024-08-04)


### Bug Fixes

* config object ([4ccf51a](https://github.com/aliakbarazizi/headless-datepicker/commit/4ccf51a7ea6c3d891d98d4d9be5aa37287ff7d11))
* isInCurrentMonth wrong value ([9a06d58](https://github.com/aliakbarazizi/headless-datepicker/commit/9a06d58b94e5f2494a03e3e61bb5ce20e46a4f00))

## [3.0.2](https://github.com/aliakbarazizi/headless-datepicker/compare/v3.0.1...v3.0.2) (2024-04-03)


### Bug Fixes

* package json typescript ([ebe7599](https://github.com/aliakbarazizi/headless-datepicker/commit/ebe7599979d3417e45013c0ddaaf605690c29c1f))

## [3.0.1](https://github.com/aliakbarazizi/headless-datepicker/compare/v3.0.0...v3.0.1) (2024-04-03)


### Bug Fixes

* package json type ([44a2f2a](https://github.com/aliakbarazizi/headless-datepicker/commit/44a2f2a6b2975cc15208f2a29357271bc81fd706))

## [3.0.0](https://github.com/aliakbarazizi/headless-datepicker/compare/v2.0.2...v3.0.0) (2024-03-13)


### ⚠ BREAKING CHANGES

* npm package change to headless-datetimepicker

### Features

* add new isDisabled and isInCurrentMonth for items and deprecated disabled ([4d75e17](https://github.com/aliakbarazizi/headless-datepicker/commit/4d75e172a6bceafaf56838f4ca89273871860478))
* change package name ([ac9570c](https://github.com/aliakbarazizi/headless-datepicker/commit/ac9570c9d268fe167548e7e9c9d305a2e58bad8d))


### Bug Fixes

* export config from package ([cf85959](https://github.com/aliakbarazizi/headless-datepicker/commit/cf859597aa12252c67b81edf1cb5b8da385007ad))

## [2.0.2](https://github.com/aliakbarazizi/headless-datepicker/compare/v2.0.1...v2.0.2) (2023-10-29)


### Bug Fixes

* maintain internal state in alwaysOpen ([2e690ef](https://github.com/aliakbarazizi/headless-datepicker/commit/2e690ef71e858ed3e3ee369cf958028db75fcc72))

## [2.0.1](https://github.com/aliakbarazizi/headless-datepicker/compare/v2.0.0...v2.0.1) (2023-10-13)


### Bug Fixes

* close action ([12c54fc](https://github.com/aliakbarazizi/headless-datepicker/commit/12c54fcdbb479aa62643f7698fa0a6f606f3016d))
* today action ([deea015](https://github.com/aliakbarazizi/headless-datepicker/commit/deea01528ef364d686887c5a1a33863e3ca9542e))

## [2.0.0](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.5...v2.0.0) (2023-10-13)


### ⚠ BREAKING CHANGES

* action will run on parent picker by default
* picker will no longer set back to default mode
* Picker will no longer close by default after you select a day item, you need to set `action="close"` in Item component

### Features

* action prop in Item component ([a1784d9](https://github.com/aliakbarazizi/headless-datepicker/commit/a1784d921504fcf24c2ed62860e65c07bb1f8775))
* action will run on parent picker by default ([7ae162f](https://github.com/aliakbarazizi/headless-datepicker/commit/7ae162fec1ca1558cafc40c1820525ee624ef3c6))
* add new actions show and toggle for year, month, day (for example showDay) ([6b5123e](https://github.com/aliakbarazizi/headless-datepicker/commit/6b5123ea77f5124c06cdb4308b99ae3742210e51))
* change action for more control over pickers ([bce06e8](https://github.com/aliakbarazizi/headless-datepicker/commit/bce06e81e8967eef8dd88dd27b4477a004983e17))
* picker will no longer set back to default mode ([e6b707b](https://github.com/aliakbarazizi/headless-datepicker/commit/e6b707b2bf32d3bfc7629ab00c1158ca4c1abf8a))


### Bug Fixes

* set hour to 0 when its not exists ([f7d6ea9](https://github.com/aliakbarazizi/headless-datepicker/commit/f7d6ea99a86b224a2ec5c68a359578e4cfba6fb9))

## [1.1.6](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.5...v1.1.6) (2023-10-05)

### Bug Fixes

- set hour to 0 when its not exists ([f7d6ea9](https://github.com/aliakbarazizi/headless-datepicker/commit/f7d6ea99a86b224a2ec5c68a359578e4cfba6fb9))

## [1.1.5](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.4...v1.1.5) (2023-08-03)

### Bug Fixes

- change types in package.json ([03a9a85](https://github.com/aliakbarazizi/headless-datepicker/commit/03a9a850a17924f5f9c2e2dbeb87f94e4fe97f76))

## [1.1.4](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.3...v1.1.4) (2023-07-27)

### Bug Fixes

- docs and type for provider ([d9e8171](https://github.com/aliakbarazizi/headless-datepicker/commit/d9e8171bb4f7567957a80f60e1a5e63ae9b019ae))

## [1.1.3](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.2...v1.1.3) (2023-07-27)

### Bug Fixes

- typescript issues ([784c55b](https://github.com/aliakbarazizi/headless-datepicker/commit/784c55bcde41d075c3403afc57aaec1df1c18f5e))

## [1.1.2](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.1...v1.1.2) (2023-07-26)

### Bug Fixes

- remove husky to prepare script ([89b2a46](https://github.com/aliakbarazizi/headless-datepicker/commit/89b2a46aa3bed706c79f99dfe72c21b292181a6a))

## [1.1.1](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.1.0...v1.1.1) (2023-07-17)

### Bug Fixes

- fix bug sometimes scroll to selected item don't work ([8b9e21c](https://github.com/aliakbarazizi/headless-datepicker/commit/8b9e21c062d7c0cc8bf3eb073844b26a0dd84fa5))

## [1.1.0](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.0.5...v1.1.0) (2023-07-15)

### Features

- add disableClickOutside prop ([9477944](https://github.com/aliakbarazizi/headless-datepicker/commit/9477944656dba9fc6a4586442312c7f6d1de1d58))
- first stable release ([5b9dbd9](https://github.com/aliakbarazizi/headless-datepicker/commit/5b9dbd9c832d828d357e25cda0897a5bb871a9e6))

### Bug Fixes

- rearrange codes ([6b3a569](https://github.com/aliakbarazizi/headless-datepicker/commit/6b3a56991605b3f8e0f6515e66e1481f13856d2b))

## [1.0.5](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.0.4...v1.0.5) (2023-06-23)

### Bug Fixes

- github workflows ([2eef0d2](https://github.com/aliakbarazizi/headless-datepicker/commit/2eef0d294311fee90e7207fc703a2188b7829615))

## [1.0.4](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.0.3...v1.0.4) (2023-06-23)

### Bug Fixes

- github workflows ([87b6915](https://github.com/aliakbarazizi/headless-datepicker/commit/87b69157c20966fe80783d83a145bade34891d81))

## [1.0.3](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.0.2...v1.0.3) (2023-06-23)

### Bug Fixes

- migrate to yarn 3 ([b34dc31](https://github.com/aliakbarazizi/headless-datepicker/commit/b34dc3175dc6725430debdfbd9c5e68047acf260))

## [1.0.2](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.0.1...v1.0.2) (2023-06-23)

### Bug Fixes

- cache yarn ([4df76e4](https://github.com/aliakbarazizi/headless-datepicker/commit/4df76e4e8276ffc1f350aba260c515dceecc3760))

## [1.0.1](https://github.com/aliakbarazizi/headless-datepicker/compare/v1.0.0...v1.0.1) (2023-06-23)

### Bug Fixes

- add yarn to repo ([f0cc161](https://github.com/aliakbarazizi/headless-datepicker/commit/f0cc16162f0464ed17435d98def00ae9d753b97b))
- update gitignore ([17b57c7](https://github.com/aliakbarazizi/headless-datepicker/commit/17b57c74c69719fc8750638b5b2e23e49b428d4f))

## 1.0.0 (2023-06-23)

### Bug Fixes

- modify github action ([5f1bc64](https://github.com/aliakbarazizi/headless-datepicker/commit/5f1bc64363025bca49c7d9f9ae47dfcaea994afb))
