const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implemente aqui os ouvintes de eventos do Node
    },
    baseUrl: "http://localhost:3000/",
  },
});
