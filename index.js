const express = require('express'),
     http = require('http');

const hostname = 'localhost';
const port = 3000;

var passport = require('passport');
var authenticate = require('./authenticate');
// morgan writes the required by the header 
const morgan = require('morgan');
const app = express();
const mongoose= require('mongoose');
const Dishes = require('./models/dishes');

var session = require('express-session');
var FileStore=  require('session-file-store')(session);
app.use(passport.initialize());
app.use(passport.session());


const URL= 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(URL);

// app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name:'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));


function auth (req, res, next) {
  console.log(req.session)

  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        req.session.user= 'admin';
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
    }
  }
  else {
      if (req.session.user === 'admin') {
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
      }
  }
}
app.use(auth);

function auth (req, res, next) {
  console.log(req.user);

  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
  }
  else {
        next();
  }
}

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