const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Promos = require('../models/promo');
const promorouter = express.Router();

promorouter.use(bodyParser.json());


promorouter.route('/:promoId')
.get((req,res,next) => {
    Promos.findById(req.params.promoId)
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
    res.end('Post operation not supported ' + req.params.promoId);
})
.put((req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set:req.body
    }, {new: true});
})
.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    
       },  (err)=> next(err))
       .catch(err)(
        next(err)
     )
});


promorouter.route('/')
.get((req,res,next) => {
    Promos.findById(req.params.promoId)
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
    Promos.create(res.body)
    .then((promos)=>{
           console.log("Leader Created" + promos);
           res.statusCode=200;
         res.setHeader('Content-type','application/json');
         res.json(promos);
 
    }, (err)=> next(err))
    .catch(err)(
     next(err)
  )
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on Promo');
})
.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    
       },  (err)=> next(err))
       .catch(err)(
        next(err)
     )
});

module.exports = promorouter;