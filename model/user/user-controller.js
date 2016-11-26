const Controller = require('../../lib/controller');
const userFacade = require('./user-facade');
const util       = require('util');
const _          = require('underscore')._;
const fs         = require('fs');


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


function selectNext(collection){

  var arrayUser = [];
  collection.forEach(function(user){
    arrayUser.push(user.name);
  });
  arrayUser = arrayUser.sort();

  if(arrayUser.length === 0)
    return "No user registered in db";

  // Get the last washer in the file
  let lastWasher = fs.readFileSync('./nextWasher', 'utf8').trim();
  if(!lastWasher){
    fs.writeFileSync('./nextWasher', arrayUser[0]);
    return arrayUser[0];
  }

  // Retrieve the washer in the array and select the next
  const indexNext = (arrayUser.indexOf(lastWasher) + 1) % arrayUser.length;
  const nameNext = arrayUser[indexNext];
  return nameNext;
}// END: selectNext

class UserController extends Controller {

  newWasher(req, res, next){

    const resCheck = checkParam(req, req.body);

    if (resCheck.code !== 200) {
      res.status(resCheck.code).send(resCheck.message);
    } else {
      fs.writeFileSync('./nextWasher', req.body.name);
      return userFacade.insertWasher(req.body.name)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err));
    }

  }// END: newWasher

  getNext(req, res, next){
    return userFacade.fetchNames()
    .then(function(collection){
      return selectNext(collection);
    })
    .then(collection => res.status(200).json(collection))
    .catch(err => next(err));
  }// END: getNext

  fetchNames(req, res, next){
    return userFacade.fetchNames()
    .then(collection => res.status(200).json(collection))
    .catch(err => next(err));
  }// END: fetchNames
}

module.exports = new UserController(userFacade);
