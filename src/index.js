import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import parsers from './parsers.js';
import fileComparison from './fileComparison.js';
import format from './formatters/index.js';

const getExtension = (filename) => extname(filename).slice(1);
const getFixturePathToFile = (filename) => resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFixturePathToFile(filename), 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  // получение содержимого файлов в виде строки
    const readFile1 = readFile(filepath1);
    const readFile2 = readFile(filepath2);
  // преобразование полученных строк в объекты с учетом формата файла (без точки)
    const file1 = parsers(readFile1, getExtension(filepath1));
    const file2 = parsers(readFile2, getExtension(filepath2));
  // генерация массива объектов, описывающих различия в двух исходных объектах
    const tree = fileComparison(file1, file2);
  // Полученный массив объектов форматируем в нужного вида строку
    return format(tree, formatName);
};

export default genDiff;