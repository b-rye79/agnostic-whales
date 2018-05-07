var express = require('express')
var MongoClient = require('mongodb').MongoClient
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
      db.collection('users').insert({ username: "admin", password: "admin123"});
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
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, { algorithm: 'RS256', expiresIn: 120, subject: user._id.toString() });
        res.status(200).json({ idToken: jwtBearerToken, expiresIn: 120}); 
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
      next()
    } 
  })
})

router.get('/user', function(req, res){
  res.sendStatus(501)
})

router.post('/post/:id', function(req, res){
  req.body.date = new Date()
  db.collection('posts').update({ _id: req.params.id }, req.body, { upsert: true }, function(err, result){

    res.send(JSON.stringify(result));
  })
})


module.exports = router