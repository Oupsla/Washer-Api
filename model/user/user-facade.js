const Model = require('../../lib/facade');
const userSchema  = require('./user-schema');

class UserModel extends Model {

    insertWasher(nameUser){

      // We will insert a empty object, because mongoose will set the
      // time at the server time
      return this.Schema
      .findOne({name: nameUser})
      .update({$push: {'listWasherDone': {}}})
      .exec();
    }
}

module.exports = new UserModel(userSchema);
