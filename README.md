### Hexlet tests and linter status:
[![Actions Status](https://github.com/VanHadsoN/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/VanHadsoN/frontend-project-46/actions)
### Code Climate:
<a href="https://codeclimate.com/github/VanHadsoN/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/562db448e5dc4a0dade8/maintainability" /></a>
### Code Climate Test Coverage:
<a href="https://codeclimate.com/github/VanHadsoN/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/562db448e5dc4a0dade8/test_coverage" /></a>
### Github Actions:
[![example workflow](https://github.com/VanHadsoN/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/VanHadsoN/frontend-project-46/actions)
# Difference Generator
Compares two configuration files and shows a difference.

Supports file extensions: `json`, `yaml/yml`.

Can output in three possible formats:
- `stylish`,
- `plain`,
- `json`.
## Minimum requirements:

```
Node.js 14+
```
## Installing:

1) Clone this repository to your filesystem:

```sh
git clone git@github.com:VanHadsoN/frontend-project-46.git
```
2) Go to directory `frontend-project-46`:
 
 ```sh
 cd <directory-name>
 ```
3) Install dependencies:
 
 ```sh
 make install or npm ci
 ```
4) Go to directory and create links:

 ```sh
 npm link
 ```
### Running as CLI-app:

```sh
gendiff <filename1> <filename2>
```

### Options:

`-f`, `--format` - specify output format (`stylish` - default, `plain` or `json`).

`-h`, `--help` - get help.

## Launch examples
### Comparison of flat files (JSON) demonstration:

for start:
```
gendiff [filepath1] [filepath2]
```
[![asciicast](https://asciinema.org/a/eRwR28JKZQt0oIHFUJBF0zhcL.svg)](https://asciinema.org/a/eRwR28JKZQt0oIHFUJBF0zhcL)

### Comparison of nested files (JSON) demonstration:
for start:
```
gendiff [filepath1] [filepath2]
```
[![asciicast](https://asciinema.org/a/L1MKxgsN83lTNkMh9PIVLzyZY.svg)](https://asciinema.org/a/L1MKxgsN83lTNkMh9PIVLzyZY)
### Comparison of nested files with plain format demonstration:
for start:
```
gendiff [filepath1] [filepath2]
```
[![asciicast](https://asciinema.org/a/tMyvjnztJh3v324G1HrPJRxhD.svg)](https://asciinema.org/a/tMyvjnztJh3v324G1HrPJRxhD)
### Comparison of nested files with json format demonstration:
for start:
```
gendiff [filepath1] [filepath2]
```
[![asciicast](https://asciinema.org/a/q1Rlbk64du1sllFyERajAcSha.svg)](https://asciinema.org/a/q1Rlbk64du1sllFyERajAcSha)