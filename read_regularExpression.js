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

// Query regular expression example 1 - Exact match 'keyword'
async function findExactMatch() {
  const courses = await Course.find({author: 'Mosh', isPublish: true}) 
  console.log(courses);
}
findExactMatch();

// Query regular expression example 2 - Starts with 'keyword'
async function findStartWith() {
  const courses = await Course.find({author: /^Mosh/});
  console.log(courses);
}
findStartWith();

// Query regular expression example 3 - Ends with 'keyword' with case insensitive
async function findEndWith() {
  const courses = await Course.find({author: /Hmadani$/i});
  console.log(courses);
}
findEndWith();


// Query regular expression example 4 - Contains 'keyword' with case insensitive
async function findContains() {
  const courses = await Course.find({author: /.*Mosh.*/i});
  console.log(courses);
}
findContains()