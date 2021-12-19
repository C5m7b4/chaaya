const arg = require('arg');
import { Options } from './interfaces';

const parseArgumentsIntoOptions = (rawArgs: string[]): Options => {
  const args = arg(
    {
      '--watch': Boolean,
      '-w': '--watch',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    watch: args['--watch'] || false,
  };
};
export default parseArgumentsIntoOptions;
