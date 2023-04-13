import _ from 'lodash';

const fileComparison = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const result = sortedKeys.map((key) => {
    // Если текущего ключа НЕТ в файле1
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    // Если текущего ключа НЕТ в файле2
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    // Если оба значения ключей являются объектами
    // рекурсивно вызываем ф-цию fileComparison передавая ей значения ключей
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: fileComparison(data1[key], data2[key]),
      };
    }
    // Если значения текущего ключа НЕ равны друг другу (значениям в файле1 и файле2)
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'updated',
        removedValue: data1[key],
        addedValue: data2[key],
      };
    }
    // Если значение текущего ключа НЕ изменилось
    return {
      key,
      type: 'unchanged',
      value: data1[key],
    };
  });

  return result;
};

export default fileComparison;
