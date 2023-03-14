import _ from 'lodash';

const fileComparison = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const compareKeys = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    } if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    } if (data1[key] !== data2[key]) {
      return {
        key,
        value1: data1[key],
        value2: data2[key],
        type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });

  return compareKeys;
};

export default fileComparison;