var mongoose = require('mongoose');
var http = require("http");
var option = require('./option.js');

var endpointSchema = mongoose.Schema({
    option: option.schema,
    name: String,
    status: {}
});

endpointSchema.methods.checkStatus = function(callback){
  var req = http.request(option, function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) { data += chunk })
    res.on('end', function() {
      console.log("finished request", "data :", data);
      callback(data);
    })
  });
  req.end();
};

var endpoint = mongoose.model('EndPoint', endpointSchema);
var object = {'model' : endpoint, 'schema': endpointSchema};

module.exports = object;
