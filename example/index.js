var lessColors = require('../');
var fs = require('fs');
var path = require('path');

var less = fs.readFileSync(path.resolve(__dirname, 'style2.less'), 'utf8');

var options = {
  paths: [__dirname]
};

lessColors(less, options, function(err, colors) {
  console.log(colors);
});
