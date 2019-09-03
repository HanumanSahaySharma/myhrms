module.exports = {
  devServer: {
    host: "localhost:8080",
  },
  module: {
    rules: [
      {
        test:/\.(s*)css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      }
    ]
  }
}
