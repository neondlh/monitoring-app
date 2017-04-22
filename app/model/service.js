var mongoose = require('mongoose');
var endpoint = require('./endpoint.js');

var serviceSchema = mongoose.Schema({
    id: String,
    name: String,
    endpoints: [endpoint.schema],
    status: {}
});

serviceSchema.methods.checkStatus = function(){
  for(i = 0; i < endpoints.length; i++){
    var endpoint = endpoints[i];
    endpoint.checkStatus(function (data) {
      endpoint.status = data;
      console.log('finished callback: ' + data + 'status: ' + endpoint.status);
    });
  }
};

var service = mongoose.model('Service', serviceSchema);
var object = {'model' : service, 'schema': serviceSchema};

module.exports = object;
