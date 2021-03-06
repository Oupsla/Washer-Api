const Model = require('../../lib/facade');
const userSchema  = require('./user-schema');

class UserModel extends Model {

    insertWasher(nameUser){

      // We will insert a empty object, because mongoose will set the
      // time at the server time
      return userSchema
      .findOne({name: nameUser})
      .update({$push: {'listWasherDone': {}}})
      .exec();
    }

    fetchNames(){
      return userSchema
      .find({}, {'name': 1, '_id': 1})
      .exec();
    }
}

module.exports = new UserModel(userSchema);
