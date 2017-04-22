var mongoose = require('mongoose');

var optionSchema = new mongoose.Schema({
    host: String,
    port: String,
    path: String,
    method: String,
    headers: {}
});

var option = mongoose.model('Option', optionSchema);
var object = {'model' : option, 'schema': optionSchema};

module.exports = object;
