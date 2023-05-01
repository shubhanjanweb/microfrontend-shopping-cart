const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ogani",
    projectName: "top-header",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "react",
      "rxjs",
      '@ogani/spa-shared-module'
    ]
  });
};
