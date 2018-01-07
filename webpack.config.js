const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

/* Setup */
const isProduction = process.argv.indexOf('-p') > -1;
const projectPath = path.join(__dirname);
const sourcePath = path.join(projectPath, 'frontend');
const buildFolder = path.join(projectPath, 'backend', 'static');
const nameSuffix = new Date().getTime() + (isProduction ? '.min' : '');
const assets = 'files';

const webpackConfig = {
  entry: {
    main: path.join(sourcePath, 'index')
  },
  output: {
    path: buildFolder,
    filename: path.join(assets, `[name]${nameSuffix}.js`)
  },
  resolve: {
    root: [path.join(sourcePath)],
    extensions: ['', '.js', '.scss', '.json']
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', ['css-loader', 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.(ico|woff)$/i,
      exclude: /node_modules/,
      loader: `file?name=[name].[ext]`
    }, {
      test: /\.js$/,
      include: [sourcePath],
      loader: 'babel-loader',

      query: {
      //   cacheDirectory: true,
      //   presets: [ ['es2015', {
      //     loose: true
      //   }] ],
        plugins: [
          ['transform-react-jsx', {
            pragma: 'h'
          }]
        ]
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin(path.join(assets, `[name]${nameSuffix}.css`), {}),
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html'),
      filename: 'index.html',
      allChunks: true
    }),
    new CleanWebpackPlugin([buildFolder], {
      root: projectPath,
      verbose: false,
      dry: false,
      exclude: ['data']
    })
  ],
  stats: {
    children: false,
    hash: false,
    version: false,
    colors: true
  },
  postcss: () => [autoprefixer],
  sassLoader: {
    includePaths: [sourcePath]
  }
};

if (process.argv.indexOf('--watch') > -1) {
  const LiveReloadPlugin = require('webpack-livereload-plugin');

  webpackConfig.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true,
    ignore: /.(js|json|config|ico|woff)$/
  }));
}

if (isProduction) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  webpackConfig.devtool = '#eval';
}

module.exports = webpackConfig;
