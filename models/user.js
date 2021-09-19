var mongoose = require('mongoose');

//Adding reference to another model
//var Locality = require('./locality')

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    introduction: {type: String},
    phone: {type: String},
    experience: {type: String},
    achievements: {type: String},
    time_stamp: {type: Date, default:Date.now()},
    //Including another schema as a type
    //locality: {type: Schema.Types.ObjectId, ref: 'Locality'},
  }
);

//Virtual function to get full name
UserSchema.virtual('fullname')
.get(function() {
  return this.first_name + ' ' + this.last_name;
})

//Pre function to beautify names
UserSchema.pre("save", function(next) {
  this.first_name = this.first_name.trim()[0].toUpperCase() + this.first_name.slice(1).toLowerCase();
  this.last_name = this.last_name.trim()[0].toUpperCase() + this.last_name.slice(1).toLowerCase();  
  next();
});

module.exports = mongoose.model('User', UserSchema)