var path = require('path');

module.exports = {
  entry: [
    "es6-shim",
    "reflect-metadata",
    "web-animations.min",
    "moment",
    "zone.js",
    path.join(__dirname, 'www', 'app', 'app.js')
  ],
  output: {
    path: path.join(__dirname, 'www', 'build', 'js'),
    filename: 'app.bundle.js',
    publicPath: 'build/js/'
    //pathinfo: true // show module paths in the bundle, handy for debugging
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "awesome-typescript-loader?doTypeCheck=false&useWebpackText=true",
        include: [path.join(__dirname, 'www')],
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        include: [path.join(__dirname, 'www')],
        exclude: /node_modules/
      },
      {
        // Loader to compile all of our SASS down.
        // Use the `resolve-url` pipe to convert the relative url paths to something this loader
        // can work with, e.g.: url('../my-file.png') => url('/path/to/my-file.png')
        // https://github.com/bholloway/resolve-url-loader
        test: /\.scss$/,
        loaders: ["style", "css", "autoprefixer?browsers=last 2 version", "resolve-url", "sass?sourceMap"]
      },
      // Any png-image or woff-font below or equal to 100K will be converted
      // to inline base64 instead
      { test: /\.(png|woff|ttf)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    modulesDirectories: [
      "node_modules",
      "node_modules/ionic-framework/node_modules", // angular is a dependency of ionic
      "node_modules/ionic-framework/dist/js", // for web-animations polyfill
      "node_modules/ionic-framework/dist/src/es5/common" // ionic-framework npm package
    ],
    extensions: ["", ".js", ".ts"]
  },
  // Sass loader configuration to tell webpack where to find the additional SASS files
  // it needs for `ionic`, located in the ionic-framework node module folder.
  // https://github.com/jtangelder/sass-loader#sass-options
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "node_modules", 'ionic-framework', 'dist', 'src', 'scss')
    ]
  }
};
