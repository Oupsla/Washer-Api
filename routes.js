const Router = require('express').Router;
const router = new Router();

const user  = require('./model/user/user-router');


router.route('/').get((req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

router.use('/user', user);


module.exports = router;
