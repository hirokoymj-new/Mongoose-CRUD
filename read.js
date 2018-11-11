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

async function getAllCourses() {
  const courses = await Course
        .find()
        .sort({name: 1})
        .select({name: 1, tags: 1})
  console.log(courses);
}
getAllCourses();


// $ node read.js 
// Connected to MongoDB
// [ { tags: [ 'css', 'frontend' ],
//     _id: 5bc3d3ad30136c717e14b0dd,
//     name: 'CSS Course' },
//   { tags: [ 'css', 'frontend' ],
//     _id: 5be757f388f8ea035b78e160,
//     name: 'CSS Course' },
//   { tags: [ 'angular', 'backend' ],
//     _id: 5bc3d36e657ec97176eb7aab,
//     name: 'ES6 Hiroko Course' },
//   { tags: [ 'HTML', 'frontend' ],
//     _id: 5bc3d38b87f5f3717a2213b8,
//     name: 'HTML Course' },
//   { tags: [ 'css', 'frontend' ],
//     _id: 5be79cbb204d59090974d202,
//     name: 'TEST 101' } ]