// /* eslint-disable */
// export default {
//   displayName: 'angular-client',
//   preset: 'ts-jest',
//   setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
//   globals: {
//     'ts-jest': {
//       tsconfig: '<rootDir>/tsconfig.spec.json',
//       stringifyContentPathRegex: '\\.(html|svg)$',
//     },
//   },
//   // coverageDirectory: '../../coverage/apps/angular-client',
//   transform: {
//     '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
//   },
//   transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
//   snapshotSerializers: [
//     'jest-preset-angular/build/serializers/no-ng-attributes',
//     'jest-preset-angular/build/serializers/ng-snapshot',
//     'jest-preset-angular/build/serializers/html-comment',
//   ],
// };
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
};
