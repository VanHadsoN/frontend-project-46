import _ from 'lodash';

const createIndent = (level) => {
  const replacer = '  ';
  const spacesCount = 2;
  const indentSize = level * spacesCount;

  const indents = {
    openBracket: replacer.repeat(indentSize - 1),
    closeBracket: replacer.repeat(indentSize - spacesCount),
  };

  return indents;
};

const stringify = (val, depth) => {
  if (!_.isObject(val)) {
    return String(val);
  }
  const indents = createIndent(depth);

  const lines = Object.entries(val).map(([key, value]) => {
    if (!_.isObject(value)) {
      return `${indents.openBracket}  ${key}: ${value}`;
    }

    return `${indents.openBracket}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

const stylish = (currentValue, depth = 1) => {
  const indents = createIndent(depth);

  const lines = currentValue.map((line) => {
    const makeValue = stringify(line.value, depth + 1);

    switch (line.type) {
      case 'added':
        return `${indents.openBracket}+ ${line.key}: ${makeValue}`;
      case 'removed':
        return `${indents.openBracket}- ${line.key}: ${makeValue}`;
      case 'updated':
        return `${indents.openBracket}- ${line.key}: ${stringify(
          line.removedValue,
          depth + 1,
        )}\n${indents.openBracket}+ ${line.key}: ${stringify(
          line.addedValue,
          depth + 1,
        )}`;
      case 'unchanged':
        return `${indents.openBracket}  ${line.key}: ${makeValue}`;
      case 'nested':
        return `${indents.openBracket}  ${line.key}: ${stylish(
          line.children,
          depth + 1,
        )}`;
      default:
        throw new Error(`Unknown type: '${line.type}'`);
    }
  });
  return ['{', ...lines, `${indents.closeBracket}}`].join('\n');
};

export default stylish;
