const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://d4edcf32-ebb8-4609-9d91-eda3efe21bf6.mock.pstmn.io",
  },
});
