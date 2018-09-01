const path = require('path') // use built in node absolute path variable
const HtmlWebpackPlugin = require('html-webpack-plugin') // creates distribution files from source templates
module.exports = {

  // file(s) webpack uses to bundle everything from (will contain multiple import lines). poly fills go here too
  entry: ['babel-polyfill', './src/js/index.js'],
  // path to and filename of file webpack uses to bundle everything into
  output: {
    path: path.resolve(__dirname, 'dist'), // __dirname is absolute path of current working directory. usage: (_dirname,relative path of distribution folder)
    filename: 'js/bundle.js' // relative path from distribution folder for bundled code
  },
  devServer: {
    contentBase: './dist'// webpack devServer serves files from this folder ONLY (i.e. not src folders) it should match output path above. NOTE webpack-dev-server injects bundled code directly into index.html in distribution folder
  },
  plugins: [ // an array of all plugins we're using
    new HtmlWebpackPlugin({
      filename: 'index.html', // name of file in output path to create i.e distribution file to create. CHANGE THIS IF YOU DON'T WANT index.html
      template: './src/index.html'// name of template file to base above filename on. CHANGE THIS IF YOU DON'T WANT index.html
    })
  ],
  // setup babel
  module: {
    rules: [
      {
        test: /\.js$/, // regexp to select files that end in .js anywhere within the root folder structure
        exclude: /node_modules/, // regexp to exclude node_modules folder
        use: {
          loader: 'babel-loader' // use babel loader when compiling .js files
        }
      }
    ]
  }
}
