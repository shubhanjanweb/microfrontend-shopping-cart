const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ogani",
    projectName: "spa-shared-module",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "single-spa",
      "rxjs",
      "rxjs/operators",
      "axios"
    ]
    // modify the webpack config however you'd like to by adding to this object
  });
};
