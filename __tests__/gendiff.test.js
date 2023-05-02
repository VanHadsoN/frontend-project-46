import { test, expect } from '@jest/globals';
import { extname, dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import fileComparison from '../src/fileComparison.js';
import selectFormatter from '../src/formatters/index.js';
import genDiff from '../index.js';
import selectParser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const getExtension = (filename) => extname(filename).slice(1);

const expectedStylishOutput = readFile('stylishOutput.txt');
const expectedPlainOutput = readFile('plainOutput.txt');
const expectedJsonOutput = readFile('jsonOutput.txt');

const formatsFiles = ['json', 'yml', 'yaml'];

test.each(formatsFiles)('different formats of files (.json, .yml, .yaml) & output styles', (formatFile) => {
  const fileName1 = `file1.${formatFile}`;
  const fileName2 = `file2.${formatFile}`;
  const readFile1 = readFile(fileName1);
  const readFile2 = readFile(fileName2);
  const file1 = selectParser(readFile1, getExtension(fileName1));
  const file2 = selectParser(readFile2, getExtension(fileName2));

  expect(selectFormatter(fileComparison(file1, file2), 'stylish')).toEqual(expectedStylishOutput);
  expect(selectFormatter(fileComparison(file1, file2), 'plain')).toEqual(expectedPlainOutput);
  expect(selectFormatter(fileComparison(file1, file2), 'json')).toEqual(expectedJsonOutput);
});

test('additional parameter format is invalid test', () => {
  const formatName = 'invalidParameter';
  const file1 = selectParser(readFile('file1.json'), 'json');
  const file2 = selectParser(readFile('file2.json'), 'json');

  expect(() => selectFormatter(fileComparison(file1, file2), formatName)).toThrow(`Unknown format to generate a tree: '${formatName}'!`);
});

test('wrong formats of files test', () => {
  expect(() => genDiff('file1.txt', 'file2.txt')).toThrow();
});
