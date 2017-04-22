var service = require('./model/service');

function getServices(res) {
    service.model.find(function (err, services) {
        if (err) {
            res.send(err);
        }
        res.json(services);
    });
};

module.exports = function (app) {
    app.get('/api/services', function (req, res) {
      console.log('get services');
        getServices(res);
    });

    app.post('/api/services', function (req, res) {
      console.log('post services');
        service.model.create({
            name: req.body.text,
            done: false
        }, function (err, todo) {
            if (err){
                res.send(err);
            }
            getServices(res);
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
