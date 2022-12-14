const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@views": path.resolve(__dirname, "src/views"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@store": path.resolve(__dirname, "src/store"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  };
  return config;
};
