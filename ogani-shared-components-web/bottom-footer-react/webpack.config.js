const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ogani",
    projectName: "bottom-footer",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "react",
      "rxjs",
      '@ogani/spa-shared-module'
    ]
    // modify the webpack config however you'd like to by adding to this object
  });
};
