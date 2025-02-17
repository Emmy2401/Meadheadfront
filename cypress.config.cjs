const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Mets ton URL si ton app tourne ailleurs
  },
});
