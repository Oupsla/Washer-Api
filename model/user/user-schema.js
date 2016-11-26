const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const timeSchema = new Schema({
  time: { type: Date, default: Date.now }
}, { _id : false });

const userSchema = new Schema({
  name: { type: String, required: true , index: { unique: true }},
  listWasherDone: [timeSchema]
});

userSchema.path('name').validate(function(value, done) {
    this.model('User').count({ name: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Name already exists');


module.exports = mongoose.model('User', userSchema);
