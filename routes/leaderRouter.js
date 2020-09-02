const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leader');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());


leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(leaders);

    }, (err)=> next(err))
    .catch(err)(
       next(err)
    )
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported ' + req.params.leaderId);
})
.put((req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set:req.body
    }, {new: true});
})
.delete((req, res, next) => {
   Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    
       },  (err)=> next(err))
       .catch(err)(
        next(err)
     )
});


leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(leaders);

    }, (err)=> next(err))
    .catch(err)(
       next(err)
    )
})
.post((req, res, next) => {
   Leaders.create(res.body)
    .then((leaders)=>{
           console.log("Leader Created" +  leaders);
           res.statusCode=200;
         res.setHeader('Content-type','application/json');
         res.json(leaders);
 
    }, (err)=> next(err))
    .catch(err)(
     next(err)
  )
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on Leader');
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    
       },  (err)=> next(err))
       .catch(err)(
        next(err)
     )
});

module.exports = leaderRouter;