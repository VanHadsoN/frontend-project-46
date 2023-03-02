import _ from 'lodash';

const fileComparison = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: fileComparison(data1[key], data2[key]),
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'updated',
        removedValue: data1[key],
        addedValue: data2[key],
      };
    }
    return {
        key,
        type: 'unchanged',
        value: data1[key],
    };
  });

    return result;
};

export default fileComparison;