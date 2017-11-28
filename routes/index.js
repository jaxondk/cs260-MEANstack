var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candidate = mongoose.model('candidate'); //links up with models/candidates.js file

//your top level app.js file takes care of connecting to the db for you b/c you added a few lines there
//otherwise would need to do it here.

router.get('/candidates', function(req,res,next) {
  console.log("GET /candidates");
  Candidate.find(function(err, candidates) {
    if(err) return console.error(err);
    console.log(candidates);
    res.json(candidates);
  });
});

router.post('/candidates',function(req,res,next) {
  console.log("POST /candidates");
  var newcandidate = new Candidate(req.body); //instantiates a Candidate object
  newcandidate.save((err,post) => {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.delete('/candidates', (req,res,next) => {
  console.log("DELETE /candidates");
  Candidate.remove({}, (err) => {//Since we give an empty {} as first param, all objects in db will match and get removed
    if(err) return console.error(err);
    //console.log("res: " +res);
    res.sendStatus(200);
  });
});

router.put('/candidates/:candidate/votefor',(req,res,next) => {
  req.candidate.votefor((err,candidate) => {
    res.json(candidate);
  });
});

router.param('candidate', function(req, res, next, id) {
  var query = Candidate.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});

module.exports = router;
