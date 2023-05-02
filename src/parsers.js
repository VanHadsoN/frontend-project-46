import { load } from 'js-yaml';

const selectParser = (content, formatName) => {
  switch (formatName) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return load(content);
    default:
      throw new Error('Wrong file format. Use JSON or YAML format.');
  }
};

export default selectParser;
