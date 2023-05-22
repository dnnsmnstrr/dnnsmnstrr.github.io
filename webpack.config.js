module.exports = {
  mode: 'development',
  entry: "./webpack/entry.js",
  output: {
    path: __dirname + "/src/assets/js/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
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
