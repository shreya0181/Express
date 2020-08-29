const express = require('express');
const bodyParser = require('body-parser');

const promorouter = express.Router();

promorouter.use(bodyParser.json());


promorouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Promos: '+ req.params.promoId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported ' + req.params.promoId);
})
.put((req, res, next) => {
    res.write('Promo updated  ' + req.params.promoId);
    res.end('Updating the Promo: ' + req.body.name + ' with details as: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the promo with id:' + req.params.promoId);
});


promorouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Promos to you!');
})
.post((req, res, next) => {
    res.end('Will add the Promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on Promo');
})
.delete((req, res, next) => {
    res.end('Deleting all Promos');
});

module.exports = promorouter;