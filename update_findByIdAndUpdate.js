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


// Update - 
// @params ID
// @params update object
// @params options - {new: true} - true to return the modified document rather than the original.
// @description
// Finds a matching document, updates it according to the update arg, passing any options, and returns the found document 
async function updateCounter() {
    const counter = await Counter.findByIdAndUpdate({_id:'entityId'}, {$inc: {seq:1}}, {new: true, upsert:true }, function(err, doc){ 
      console.log(doc.seq);
      console.log(doc);
    });
  }    

updateCounter();

// $ node update_findByIdAndUpdate.js 
// Connected to MongoDB
// 37
// { seq: 37, _id: 'entityId', __v: 0 }


// References:
//https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
//https://stackoverflow.com/questions/28357965/mongoose-auto-increment
//https://mongoosejs.com/docs/middleware.html
//https://mongoosejs.com/docs/middleware.html#pre