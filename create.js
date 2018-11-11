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

async function createCourse() {
  const course = new Course({
    name: 'TEST 101',
    author: 'Jim',
    tags: ['css', 'frontend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}
createCourse();


// $ node create.js
// Connected to MongoDB
// { tags: [ 'css', 'frontend' ],
//   date: 2018-11-11T03:06:35.712Z,
//   _id: 5be79cbb204d59090974d202,
//   name: 'TEST 101',
//   author: 'Hiroko',
//   isPublished: true,
//   __v: 0 }