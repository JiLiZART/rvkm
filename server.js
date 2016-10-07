require('babel-register');

const express = require('express');
const webpack = require('webpack');
const {development} = require('./webpack.config');

const app = express();
const compiler = webpack(development);
const PORT = 2000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: development.output.publicPath,
  stats: {colors: true}
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(PORT, function (err) {
  if (err) throw err;
  var addr = this.address();

  console.log(`Listening at ${addr.family} ${addr.address}:${addr.port}`);
});
