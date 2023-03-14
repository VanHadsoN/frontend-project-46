import path from 'path';
import { readFileSync } from 'fs';
import process from 'process';
import fileComparison from './fileComparison.js';
import makeString from './makeString.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => readFileSync(getAbsolutePath(filepath), 'utf-8');
const getExtension = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2) => {
  const obj1 = (getData(filepath1), getExtension(filepath1));
  const obj2 = (getData(filepath2), getExtension(filepath2));
  const differences = fileComparison(obj1, obj2);
  return makeString(differences);
};