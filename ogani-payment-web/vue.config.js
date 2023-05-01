module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      disableHostCheck: true,
      sockPort: 9006,
      sockHost: "localhost",
      https: false,
      port: 9006
    },
    externals: ["vue", "vue-router", "axios", "@ogani/spa-shared-module"]
  },
  filenameHashing: false
};
