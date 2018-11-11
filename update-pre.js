const mongoose = require('mongoose');
// Connect MongoDB
mongoose.connect('mongodb://localhost/playground')
  .then(()=>console.log("Connected to MongoDB"))
  .catch(err =>console.log('Could not connect MongoDB', err));


// Create Schema - Schema is the shape of document.
const counterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

const employeeSchema = mongoose.Schema({
  name: {type: String},
  eid: {type: String}
});
const Employee = mongoose.model('Employee', employeeSchema);

employeeSchema.pre('save', function(next) {
  var doc = this;
    const counter = Counter.findByIdAndUpdate(
      {_id:'entityId'},
      {$inc: {seq:1}},
      {new: true, upsert:true }, function(err, counter){ 
        if(err) return next(error);
        doc.eid = counter.seq;
        next();
      });
});

async function createEmployee(){
  const employee = new Employee({
    name: "Hiroko"
  });
  const result = await employee.save();
  console.log(result);  
}
createEmployee();


// $ node create-pre.js 
// Connected to MongoDB
// { _id: 5be7a375dad31309df6e9f52,
//   name: 'Hiroko',
//   eid: '38',
//   __v: 0 }
// $ node create-pre.js 
// Connected to MongoDB
// { _id: 5be7a38956eec609e2f7610e,
//   name: 'Hiroko',
//   eid: '39',
//   __v: 0 }



// References - how to implement auto increment using findByIdAndUpdate, $inc, pre middleware
//https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
//https://stackoverflow.com/questions/28357965/mongoose-auto-increment
//https://mongoosejs.com/docs/middleware.html
//https://mongoosejs.com/docs/middleware.html#pre