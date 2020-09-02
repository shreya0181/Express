const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = 3000;

// morgan writes the required by the header 
const morgan = require('morgan');
const app = express();
const mongoose= require('mongoose');
const Dishes = require('./models/dishes');

const URL= 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(URL);

function auth(req, res, next)
{
  console.log(req.headers);

  var authHeader = req.headers.authorization;

  if(!authHeader)
  {
    var err = new Error('You are not authenticated');

    res.setHeader('WWW-Authenticate', 'Basic');
    err.status=401;
    return next(err);
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString.split(':');
  var username =auth[0];
  var password= auth[1];

  if( username=== 'admin' && password ==='password')
  {
    next();
  }

  else{
    var err = new Error('You are not authenticated');

    res.setHeader('WWW-Authenticate', 'Basic');
    err.status=401;
    return next(err);
  }

}

app.use(auth);


connect.then((db)=>{

  console.log('connected to the server');
}, (err)=>{
  console.log(err);
});


const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promorouter');
const leaderRouter = require('./routes/leaderRouter');
app.use('/dishes', dishRouter);
app.use('/promos', promoRouter);
app.use('/leader', leaderRouter);


app.use(morgan('dev'));

// to parse the json object 
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//  working with different endpoints using rest resources 
app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});
// using next passing the modified req, res

app.get('/', (req,res,next) => {
  res.end('Express Server');
});

app.get('/dishes', (req,res,next) => {
  res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
res.statusCode = 403;
res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
  res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});