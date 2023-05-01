const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { ProvidePlugin } = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ogani",
    projectName: "dashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: [
      "react",
      "rxjs",
      "*.png",
      '@ogani/spa-shared-module'
    ],
    plugins: [
      new ProvidePlugin({
        'jquery': 'jquery',
        'owl.carousel': "owl.carousel"
      })
    ],
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        }
      ]
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
