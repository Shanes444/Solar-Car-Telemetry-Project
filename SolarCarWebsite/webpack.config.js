const path = require('path');

module.exports = {
  entry: './public/config.js', // Your main application file
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  // Add any other necessary loaders or plugins here
};