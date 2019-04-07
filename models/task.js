// Load required packages
var mongoose = require('mongoose');

// Define our Task schema
var TaskSchema = new mongoose.Schema({
    name              : {type : String, required : true},
    description       : {type : String, default : "No description"},
    deadline          : {type : Date, required : true},
    completed         : {type : Boolean, default : false},
    AssignedUser      : {type : String, default : ""},
    AssignedUserName  : {type : String, default : "unassigned"},
    dateCreated       : {type: Date, default : Date.now}


});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);
