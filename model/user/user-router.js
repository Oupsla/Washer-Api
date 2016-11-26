const controller = require('./user-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/id/:id')
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));


router.route('/washer')
  .post((...args) => controller.newWasher(...args))
  .get((...args) => controller.getNext(...args));

router.route('/names')
  .get((...args) => controller.fetchNames(...args));

module.exports = router;
