module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "jest-environment-jsdom-fourteen",
  testEnvironmentOptions: {
    // JSDOM options to run external scripts (Google sdk etc.)
    runScripts: "dangerously",
    resources: "usable"
  }
};
