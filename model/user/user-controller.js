const Controller = require('../../lib/controller');
const userFacade  = require('./user-facade');
const util       = require('util');
const _          = require('underscore')._;


const findSchema = {
  name:{
    in: 'body',
    optional: false
  }
};

function checkParam(req, params) {
  // Test for invalid params
  const correctParams = _.keys(findSchema);
  const queryParams =   _.keys(params);

  let queryCheck = null;
  queryParams.forEach((param) => {
    if (correctParams.indexOf(param) === -1) {
      queryCheck = { message: `${param} is not a valid param`, code: 400 };
    }
    return null;
  });
  if (queryCheck)    { return queryCheck; }

  req.check('name', 'Name is not valid.').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return { message: `There have been validation errors: ${util.inspect(errors)}`, code: 400 };
  }

  return { message: null, code: 200 };
}// END: checkParam

class UserController extends Controller {

  newWasher(req, res, next){

    const resCheck = checkParam(req, req.body);

    if (resCheck.code !== 200) {
      res.status(resCheck.code).send(resCheck.message);
    } else {
      return userFacade.insertWasher(req.body.name)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err));
    }

  }// END: newWasher
}

module.exports = new UserController(userFacade);
