const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './components/index.js'],
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      GRAPHQL_URI:
        process.env.NODE_ENV === 'production'
          ? JSON.stringify('https://afternoon-mountain-72827.herokuapp.com//graphql')
          : JSON.stringify('http://localhost:3999/graphql')
    })
  ]
}
