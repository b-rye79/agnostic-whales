var express = require('express')
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var fs = require('file-system');
var router = express.Router()
var cors = require('cors')

var db;
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err

  db = client.db('blog');

  db.collection('users').find().toArray(function(err, users){
    if(users.length == 0){
      console.log('Creating admin user.')
      db.collection('users').insert({ username: "admin", password: "admin123", role: "admin"});
    }
  })
})

router.use(cors())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/featured', function(req, res){
  db.collection('posts').find().toArray(function (err, posts) {
    if (err) throw err
    res.send(JSON.stringify(posts));
  })
})

router.get('/catagory/:tag', function(req, res){
  db.collection('posts').find({"tags" : { $in : [req.params.tag]  } }).toArray(function (err, posts) {
    if (err) throw err
    res.send(JSON.stringify(posts));
  })
})

router.get('/post/:id', function(req, res){
  db.collection('posts').findOne({ _id: req.params.id }, function (err, post) {
    if (err) throw err
    res.send(JSON.stringify(post));
  })
})

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');
router.post('/signin', function(req, res) {
  db.collection('users').findOne( {$or: [
    { username: req.body.email, password: req.body.password },
    { email: req.body.email, password: req.body.password }]}, function(err, user){
    if (err || !user) res.sendStatus(401)
    else {
        var exp = 60 * 60 * 24;
        const jwtBearerToken = jwt.sign({ role: user.role }, RSA_PRIVATE_KEY, { algorithm: 'RS256', expiresIn: exp, subject: user._id.toString() });
        res.status(200).json({ idToken: jwtBearerToken, expiresIn: exp }); 
    }
  });
});

const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');
router.all('/*', function(req, res, next){
  var token = req.get('X-Auth-Token')
  jwt.verify(token, RSA_PUBLIC_KEY, { algorithm: 'RS256'}, function(err, decoded){
    if(err) res.sendStatus(401)
    else {
      console.log(decoded)
      req.locals = { id: decoded.sub, role: decoded.role }
      next()
    } 
  })
})

router.get('/user', function(req, res){
  db.collection('users').findOne( { _id: ObjectId(req.locals.id) }, function(err, user){
    if (err || !user) res.sendStatus(500)
    else {
        res.send(JSON.stringify(user)); 
    }
  });
})

router.post('/user', function(req, res){
  if(req.locals.id === req.body._id || req.locals.role === "admin" ){
    delete req.body._id
    if(!req.body.role) req.body.role = "contributor";
    
    db.collection('users').update({ _id: ObjectId(req.locals.id) }, req.body, { upsert: true }, function(err, result){
      if (err) res.sendStatus(500)
      else {
        res.send(JSON.stringify(result));
      }
    })
  } else{
    res.sendStatus(401)
  }
})

router.post('/post', function(req, res){
  db.collection('users').findOne( { _id: ObjectId(req.locals.id) }, function(err, user){
    if (err || !user) res.sendStatus(401)
    else {
      req.body.date = new Date()
      req.body.author = user.name ? user.name : user.username;
      db.collection('posts').update({ _id: req.body._id }, req.body, { upsert: true }, function(err, result){
        if (err) res.sendStatus(500)
        else {
          res.send(JSON.stringify(result));
        }
      })
    }
  });
})


module.exports = router