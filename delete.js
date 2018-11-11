const mongoose = require('mongoose');
// Connect MongoDB
mongoose.connect('mongodb://localhost/playground')
  .then(()=>console.log("Connected to MongoDB"))
  .catch(err =>console.log('Could not connect MongoDB', err));


// Create Schema - Schema is the shape of document.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean,
  cid: Number
});

const Course = mongoose.model('Course', courseSchema);

// Delete
async function deleteCourse(id){
    const course = await Course.deleteOne({_id: id});
    if(!course) return;
    console.log(course);
  }
  
deleteCourse("5be79cbb204d59090974d202");

// $ node delete.js 
// Connected to MongoDB
// { n: 1, ok: 1 }