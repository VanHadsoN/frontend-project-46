import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

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
    // Если равны ключи и значения
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(` ${key}: ${data1[key]}`);
      }
    }
    // Если равны ключи, но значения разные
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        result.push(` - ${key}: ${data1[key]}`);
        result.push(` + ${key}: ${data2[key]}`);
      }
    }
    // Если ключ есть в первом файле, но нет во втором
    if (_.has(data1, key) && !_.has(data2, key)) {
      result.push(` - ${key}: ${data1[key]}`);
    }
    // Если ключ есть во втором файле, но нет в первом
    if (!_.has(data1, key) && _.has(data2, key)) {
      result.push(` + ${key}: ${data2[key]}`);
    }
  });
  };
  
  console.log(fileComparison(parseFile1, parseFile2));
};

export default genDiff;