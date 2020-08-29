const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Leaders: '+ req.params.leaderId);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported ' + req.params.leaderId);
})
.put((req, res, next) => {
    res.write('Leader updated  ' + req.params.leaderId);
    res.end('Updating the Leader: ' + req.body.name + ' with details as: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting the Leader with id:' + req.params.leaderId);
});


leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Leader to you!');
})
.post((req, res, next) => {
    res.end('Will add the Leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on Leader');
})
.delete((req, res, next) => {
    res.end('Deleting all Leaders');
});

module.exports = leaderRouter;