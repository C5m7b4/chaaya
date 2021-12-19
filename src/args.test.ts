import parseArgumentsIntoOptions from './args';

const sampleArgs1 = [
  'C:\\Program Files\\nodejs\\node.exe',
  'c:\\TestDev\\testing-framework\\chaaya\\bin\\chaaya.js',
  '--watch',
];

const sampleArgs2 = [
  'C:\\Program Files\\nodejs\\node.exe',
  'c:\\TestDev\\testing-framework\\chaaya\\bin\\chaaya.js',
];

const sampleArgs3 = [
  'C:\\Program Files\\nodejs\\node.exe',
  'c:\\TestDev\\testing-framework\\chaaya\\bin\\chaaya.js',
  '-w',
];

describe('parseArgumentsIntoOptions', () => {
  it('should return only one argument', () => {
    expect(parseArgumentsIntoOptions(sampleArgs1)).toStrictEqual({
      watch: true,
    });
  });
  it('should return no arguments', () => {
    expect(parseArgumentsIntoOptions(sampleArgs2)).toStrictEqual({
      watch: false,
    });
  });
  it('should understand -w flag', () => {
    expect(parseArgumentsIntoOptions(sampleArgs3)).toStrictEqual({
      watch: true,
    });
  });
});
