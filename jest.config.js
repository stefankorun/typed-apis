module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironmentOptions: {
    // JSDOM options to run external scripts (Google sdk etc.)
    runScripts: "dangerously",
    resources: "usable"
  }
};
