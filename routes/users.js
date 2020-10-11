var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({ "success": true} );
});

router.get('/errorSync', function(req, res, next) {
  throw new Error("error occured");
});

router.get('/errorAsync', function(req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
});

router.get('/:name', async function (req, res, next) {
  await getUserById(req.params.name)
  .then((user)=> res.send(user))
  .catch(err =>next(err));
});

async function getUserById (name) {
  if(!isNaN(name)) {
    throw new Error('User not found');
  } else {
    let user = {"success": true, name : name};
    return await user;
  }
}

module.exports = router;
