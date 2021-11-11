//Get ENV variables from process.env
const PORT = process.env.PORT || 1100;

//Load ip node module
var ip = require('ip');
var cors = require('cors');

//Load and initialize express
var express = require('express');
var app = express();

//Load and connect to mongodb
var mongoose = require('mongoose');
//Connect to Mongoose DB
mongoose.connect('mongodb://mongo:27017/employees',{ useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/employees', { useNewUrlParser: true });
var EmployeeModel = require('./employee.js');

//Enable CORS for the server
var originsWhitelist = [
  'http://localhost:4200',
  'http://localhost:8085'
];

var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
}
//here is the magic
app.use(cors(corsOptions));

//Load and initialize body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//GET API to get employee by ID
app.get('/v1/employee/eid/:_id', async (req, res) => {
  try {
    var employee = await EmployeeModel.findById(req.params._id).exec();
    if (employee == null) {
      res.send({
        'status': true,
        'message': 'No employee found with the ID : ' + req.params._id
      });
    } else {
      res.send(employee);
    }
  } catch (error) {
    console.log('Error occurred : ' + error);
    res.status(500).send({ 'status': 'Error Occurred in API | ' + error });
  }
});

//GET API to find employees by email 
app.get('/v1/employee/search/email/:email', async (req, res) => {
  try {
    var employees = await EmployeeModel.find({ 'email': { $regex: '^'+req.params.email } }).exec();
    if (employees.length == 0) {
      res.send({
        'found': false
      });
    } else {
      res.send({ 'found': true, 'employees': employees });
    }
  } catch (error) {
    console.log('Error occurred : ' + error);
    res.status(500).send({ 'status': 'Error Occurred in API | ' + error });
  }
});

//GET API to get employee by email
app.get('/v1/employee/email/:email', async (req, res) => {
  try {
    var employee = await EmployeeModel.findOne({ 'email': { $regex: '^'+req.params.email } }).exec();
    if (employee == null) {
      res.send({
        'found': false
      });
    } else {
      res.send({ 'found': true, 'employee': employee });
    }
  } catch (error) {
    console.log('Error occurred : ' + error);
    res.status(500).send({ 'status': 'Error Occurred in API | ' + error });
  }
});

//DELETE API to remove employee from DB
app.delete('/v1/employee/eid/:_id', async (req, res) => {
  try {
    var employee = await EmployeeModel.findByIdAndDelete(req.params._id).exec();
    res.send({
      'status': 'success',
      'message': 'Employee record with id : ' + req.params._id + ' was deleted from the DB!'
    });
  } catch (error) {
    console.log('Error occurred : ' + error);
    res.status(500).send({ 'status': 'Error Occurred in API | ' + error });
  }
});

//POST API to create new employee
app.post('/v1/employee', async (req, res) => {
  console.log("POST API called!");
  try {
    var employee = new EmployeeModel(req.body);
    var result = await employee.save();
    res.send({
      'status': true,
      'message': 'Employee record with id : ' + req.body._id + ' was saved to the DB!'
    });
  } catch (error) {
    res.status(500).send({ 'status': false, 'message': 'Error Occurred in API | ' + error });
    console.log(error);
  }
});

//PUT API to update employee
app.put('/v1/employee', async (req, res) => {
  console.log("PUT API called!");
  try {
    var employee = new EmployeeModel(req.body);
    console.log(employee);
    var result = await EmployeeModel.findByIdAndUpdate({ _id: employee._id }, { $set: { name: employee.name, email: employee.email } }, { new: true });
    console.log(result);
    res.send({
      'status': true,
      'message': 'Employee record with id : ' + req.body._id + ' was updated in the DB!'
    });
  } catch (error) {
    res.status(500).send({ 'status': false, 'message': 'Error Occurred in API | ' + error });
    console.log(error);
  }
});

//Launch listening server on port 8081
app.listen(PORT, function () {
  console.log('Employee API running at ' + ip.address() + ':' + PORT + '/v1/employee');
});