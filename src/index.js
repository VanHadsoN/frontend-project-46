import { resolve } from 'path';
import { readFileSync } from 'fs';
//import parsers from './parsers.js';
//import fileComparison from './fileComparison.js';
//import format from './formatters/index.js';

//const getExtension = (filename) => extname(filename).slice(1);
const getFixturePathToFile1 = (filepath1) => resolve(process.cwd(), filepath1);
const getFixturePathToFile2 = (filepath2) => resolve(process.cwd(), filepath2);
//const readFile = (filename) => readFileSync(getFixturePathToFile(filename), 'utf-8');

const genDiff = (filepath1, filepath2) => {       

  const file1 = JSON.parse(readFileSync(getFixturePathToFile1(filepath1), 'utf-8'));    

  const file2 = JSON.parse(readFileSync(getFixturePathToFile2(filepath2), 'utf-8'));

  const comparison = (file1, file2);

  //const str = extname(comparison);

  console.log(comparison);  

};

export default genDiff;