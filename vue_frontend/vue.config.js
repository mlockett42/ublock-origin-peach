// let path = require("path");

module.exports = {
  // From https://stackoverflow.com/a/53349027
  // outputDir: path.resolve(__dirname, "./dist"),

  assetsDir: ".",

  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "Popup",
    },
    // options: {
    //   template: "public/browser-extension.html",
    //   entry: "./src/options/main.js",
    //   title: "Options",
    // },
  },

  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js",
        },
        // contentScripts: {
        //   entries: {
        //     "content-script": ["src/content-scripts/content-script.js"],
        //   },
        // },
      },
    },
  },

  transpileDependencies: [
    'vuetify'
  ]
};
