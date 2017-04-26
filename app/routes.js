var service = require('./model/service');

function getServices(res) {
    service.model.find(function (err, services) {
        if (err) {
            res.send(err);
        }
        res.json(services);
    });
};

function parseText(req){
  var newService = JSON.parse(req.body.text);
  return newService;
};

function checkStatus(callback, services, data){
      for(i = 0; i < services.length; i++){
        var service = services[i];
        console.log("checkStatus of: " + service.name);
        service.checkStatus();
        callback(service.status);
        //res.json(service.status);
      }
};

module.exports = function (app) {
    app.get('/api/services', function (req, res) {
        getServices(res);
    });

    app.post('/api/services', function (req, res) {
      console.log('post services');
        service.model.create(parseText(req), function (err, todo) {
            if (err){
                res.send(err);
            }
            getServices(res);
        });
    });

    app.get('/api/services/status', function (req, res) {
        var services = getServices(res);
        checkStatus(function (req, services, data) {
           console.log("The data is: " + data);
         })
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
