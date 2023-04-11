import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof (value) === 'string' ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .filter(({ type }) => type !== 'unchanged')
      .map((line) => {
        const keys = [...path, line.key];
        const property = keys.join('.');

        switch (line.type) {
          case 'added':
            return `Property '${property}' was added with value: ${stringify(
              line.value,
            )}`;
          case 'removed':
            return `Property '${property}' was removed`;
          case 'updated':
            return `Property '${property}' was updated. From ${stringify(
              line.removedValue,
            )} to ${stringify(line.addedValue)}`;
          case 'nested':
            return iter(line.children, keys);
          default:
            throw new Error(`Unknown type: '${line.type}'`);
        }
      });
    return lines.join('\n');
  };

  return iter(tree, []);
};

export default plain;