//Require mongoose
var mongoose = require('mongoose');

//Initiate a new schema
var Schema = mongoose.Schema;

//Create employee schema
var EmployeeSchema = new Schema({
    _id: Number,
    name: String,
    email: String
});

//Export function
module.exports = mongoose.model('EmployeeModel',EmployeeSchema);

