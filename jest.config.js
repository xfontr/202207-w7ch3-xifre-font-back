/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  passWithNoTests: true,
  collectCoverageFrom: [
    "!src/index.tsx",
    "!src/server/index.ts",
    "!src/server/startServer.ts",
  ],
};
