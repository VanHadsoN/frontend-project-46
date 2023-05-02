import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import selectParser from './parsers.js';
import buildTree from './fileComparison.js';
import selectFormatter from './formatters/index.js';

const getExtension = (filename) => extname(filename).slice(1);
const getFixturePathToFile = (filename) => resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFixturePathToFile(filename), 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);
  const file1 = selectParser(readFile1, getExtension(filepath1));
  const file2 = selectParser(readFile2, getExtension(filepath2));

  const tree = buildTree(file1, file2);
  return selectFormatter(tree, formatName);
};

export default genDiff;
