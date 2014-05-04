var less = require('less');
var parser = new(less.Parser);
var fs = require('fs');

module.exports = function(lessSource, callback) {

  parser.parse(lessSource, function (err, tree) {
    if (err) {
      return callback(err);
    }

    var vars = tree.rules.filter(function(rule) {
      return (rule.variable === true);
    });
    var colors = [];

    vars.forEach(function(v) {
      //check if color
      if (v.value && v.value.value && v.value.value.length == 1 && v.value.value[0].value.length == 1 && v.value.value[0].value[0].rgb) {
        var value = v.value.value[0].value[0];
        var color = new less.tree.Color(value.rgb, value.alpha);
        colors.push({
          name: v.name,
          hex: color.toRGB(),
          rgb: value.rgb,
          alpha: value.alpha
        });
      }
    });
    callback(null, colors);

  });
};
