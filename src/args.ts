const arg = require('arg');

const parseArgumentsIntoOptions = (rawArgs: string[]) => {
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
