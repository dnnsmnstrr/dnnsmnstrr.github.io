module.exports = {
  mode: 'development',
  entry: "./webpack/entry.js",
  output: {
    path: __dirname + "/src/assets/javascripts/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {loader: "babel-loader"}, // "babel-loader" is also a legal name to reference
        ],
        exclude: /(node_modules)/
      }
    ]
  }
};
