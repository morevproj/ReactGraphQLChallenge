const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = true;
const isProd = !isDev;

const filename = ext => (isDev) ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelLoader = preset => {
  const config = {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env"
      ],
      plugins: [
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
      ]
    }
  }

  if (preset) {
    config.options.presets.push(preset);
  }

  return config;
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.jsx',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: isProd
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            }
          }
        ]
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: babelLoader() 
      },
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        use: babelLoader('@babel/preset-react') 
      }
    ]
  }
}