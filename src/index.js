import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
//import parsers from './parsers.js';
//import fileComparison from './fileComparison.js';
//import format from './formatters/index.js';

//const getExtension = (filename) => extname(filename).slice(1);
const getFixturePathToFile = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFixturePathToFile(filename), 'utf-8');

const genDiff = (filepath1, filepath2) => {       

  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const parseFile1 = JSON.parse(readFile1);
  const parseFile2 = JSON.parse(readFile2);

  const fileComparison = (data1, data2) => {
  // _.keys(data) - Массив ключей каждого объекта
  // Объединяем два массива в один без дублирующихся ключей и сортируем его
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = sortedKeys.map((key) => {
    // Если текущего ключа НЕТ в файле1
    if (!_.has(data1, key)) {
      return {
        type: '+',
        key,
        value: data2[key],
      };
    }
    // Если текущего ключа НЕТ в файле2
    if (!_.has(data2, key)) {
      return {
        type: '-',
        key,
        value: data1[key],
      };
    }
    // Если значения текущего ключа НЕ равны друг другу (значениям в файле1 и файле2)
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: '-+',
        key,
        removedValue: data1[key],
        addedValue: data2[key],
      };
    }
    // Если значение текущего ключа НЕ изменилось
    return {
      type: ' ',
      key,
      value: data1[key],
    };
  });

  return result;
  };
  console.log(fileComparison(parseFile1, parseFile2));
};

export default genDiff;